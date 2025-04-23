"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";

interface HealthReport {
  id: string;
  title: string;
  symptoms: string;
  assessment: string;
  createdAt: string;
}

export default function HealthMonitorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [healthReports, setHealthReports] = useState<HealthReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<HealthReport | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Check if user is authenticated
  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
    return null;
  }

  // Fetch health reports from the database
  const fetchHealthReports = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/health-report");
      
      if (!response.ok) {
        throw new Error("Failed to fetch health reports");
      }
      
      const data = await response.json();
      setHealthReports(data.reports || []);
    } catch (error) {
      console.error("Error fetching health reports:", error);
      toast.error("Failed to load health reports");
    } finally {
      setIsLoading(false);
    }
  };

  // Load health reports on component mount
  useEffect(() => {
    if (status === "authenticated") {
      fetchHealthReports();
    }
  }, [status]);

  const viewReportDetails = (report: HealthReport) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
        <Link 
          href="/diagnosis" 
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm font-medium"
        >
          New Assessment
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Health History</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : healthReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symptoms
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {healthReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(report.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">{report.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">{report.symptoms}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        className="text-teal-600 hover:text-teal-900 font-medium"
                        onClick={() => viewReportDetails(report)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No health records found. Start by getting a new assessment.</p>
            <Link 
              href="/diagnosis" 
              className="mt-4 inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm font-medium"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Health Insights</h3>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-blue-700">
            <strong>Tip:</strong> Regular health monitoring can help identify patterns and improve your overall wellbeing.
          </p>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-md p-4">
            <h4 className="text-md font-medium text-gray-800">Recent Activity</h4>
            <p className="text-sm text-gray-600 mt-2">
              You've tracked {healthReports.length} health concerns in total.
            </p>
          </div>
          <div className="border border-gray-200 rounded-md p-4">
            <h4 className="text-md font-medium text-gray-800">Next Steps</h4>
            <p className="text-sm text-gray-600 mt-2">
              Consider updating your health profile for more accurate assessments.
            </p>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">{selectedReport.title}</h2>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 mb-6 text-sm text-gray-500">
                <p><strong>Date:</strong> {formatDate(selectedReport.createdAt)}</p>
                <p className="mt-2"><strong>Reported Symptoms:</strong></p>
                <p className="mt-1 pl-2 border-l-2 border-gray-200">{selectedReport.symptoms}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="prose max-w-none prose-headings:font-bold prose-headings:text-teal-700 prose-h3:text-lg prose-h2:text-xl prose-a:text-blue-600 prose-strong:text-gray-800 prose-ul:list-disc prose-ol:list-decimal">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Assessment</h3>
                  <ReactMarkdown>{selectedReport.assessment}</ReactMarkdown>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm">
                <p>
                  <strong>Important:</strong> This assessment is generated by AI and is not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of your physician or other qualified health provider with any questions about a medical condition.
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}