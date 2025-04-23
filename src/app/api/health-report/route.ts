import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// API route to create a new health report
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    // Check if user is authenticated
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get request body
    const body = await req.json();
    const { symptoms, assessment } = body;

    if (!symptoms || !assessment) {
      return NextResponse.json(
        { error: "Symptoms and assessment are required" },
        { status: 400 }
      );
    }

    // Generate a title from the assessment (first line or heading)
    let title = assessment.split("\n")[0];

    // Remove markdown formatting from the title
    title = title.replace(/^#+\s+/, ""); // Remove heading markers
    title = title.replace(/^\*\*|\*\*$|__/g, ""); // Remove bold markers

    // Trim and limit title length
    title = title.trim();
    if (title.length > 100) {
      title = title.substring(0, 97) + "...";
    }

    // If title is still empty or only contains special characters, create a default title
    if (!title || title.length < 3) {
      title = `Health Assessment - ${new Date().toLocaleDateString()}`;
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    // If user doesn't exist, create them
    let userId: string;
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || "",
          image: session.user.image || "",
        },
      });
      userId = newUser.id;
    } else {
      userId = user.id;
    }

    // Create the health report
    const report = await prisma.healthReport.create({
      data: {
        title,
        symptoms,
        assessment,
        userId,
      },
    });
    console.log(report);

    return NextResponse.json({
      success: true,
      report: {
        id: report.id,
        title: report.title,
        createdAt: report.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating health report:", error);
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    );
  }
}

// API route to get all health reports for a user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    // Check if user is authenticated
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ reports: [] });
    }

    // Get all health reports for the user, sorted by creation date (newest first)
    const reports = await prisma.healthReport.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        symptoms: true,
        assessment: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ reports });
  } catch (error) {
    console.error("Error fetching health reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}
