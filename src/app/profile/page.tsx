"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface HealthReport {
  id: string;
  title: string;
  createdAt: string;
}

interface ProfileData {
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
  allergies?: string;
  chronicConditions?: string;
  medications?: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [recentReports, setRecentReports] = useState<HealthReport[]>([]);
  
  // Default profile data (this could be fetched from database in a real application)
  const [profileData, setProfileData] = useState<ProfileData>({
    age: "",
    gender: "",
    height: "",
    weight: "",
    allergies: "",
    chronicConditions: "",
    medications: "",
  });

  // Check if user is authenticated
  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
    return null;
  }

  // Fetch recent health reports
  useEffect(() => {
    async function fetchRecentReports() {
      try {
        const response = await fetch("/api/health-report");
        if (!response.ok) {
          throw new Error("Failed to fetch health reports");
        }
        
        const data = await response.json();
        // Get only the 3 most recent reports
        setRecentReports((data.reports || []).slice(0, 3));
      } catch (error) {
        console.error("Error fetching health reports:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchRecentReports();
    }
  }, [status]);

  // Handle profile data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile data
  const saveProfile = () => {
    // In a real app, this would save to a database
    toast.success("Profile updated successfully!");
    setEditMode(false);
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Health Profile</h1>
        <p className="text-gray-600 mt-1">Manage your information and health records</p>
      </div>

      {/* Profile Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-2 border-teal-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-2xl font-bold border-2 border-teal-500">
                {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "?"}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{session?.user?.name || "User"}</h2>
            <p className="text-gray-600">{session?.user?.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">
                Active Member
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {recentReports.length} Health Reports
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm font-medium transition"
          >
            {editMode ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Personal Health Information */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Personal Health Information</h3>
              {editMode && (
                <button
                  onClick={saveProfile}
                  className="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm font-medium transition"
                >
                  Save Changes
                </button>
              )}
            </div>
            
            {editMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="text"
                      id="age"
                      name="age"
                      value={profileData.age}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input
                      type="text"
                      id="height"
                      name="height"
                      value={profileData.height}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={profileData.weight}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    rows={2}
                    value={profileData.allergies}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="List any allergies you have..."
                  />
                </div>
                
                <div>
                  <label htmlFor="chronicConditions" className="block text-sm font-medium text-gray-700 mb-1">
                    Chronic Conditions
                  </label>
                  <textarea
                    id="chronicConditions"
                    name="chronicConditions"
                    rows={2}
                    value={profileData.chronicConditions}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="List any chronic conditions..."
                  />
                </div>
                
                <div>
                  <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Medications
                  </label>
                  <textarea
                    id="medications"
                    name="medications"
                    rows={2}
                    value={profileData.medications}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="List any medications you're currently taking..."
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Age</h4>
                    <p className="text-gray-800">{profileData.age || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Gender</h4>
                    <p className="text-gray-800">{profileData.gender || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Height</h4>
                    <p className="text-gray-800">{profileData.height ? `${profileData.height} cm` : "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Weight</h4>
                    <p className="text-gray-800">{profileData.weight ? `${profileData.weight} kg` : "Not provided"}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Allergies</h4>
                    <p className="text-gray-800">{profileData.allergies || "None reported"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Chronic Conditions</h4>
                    <p className="text-gray-800">{profileData.chronicConditions || "None reported"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Current Medications</h4>
                    <p className="text-gray-800">{profileData.medications || "None reported"}</p>
                  </div>
                </div>
              </div>
            )}
            
            {!editMode && !profileData.age && !profileData.gender && !profileData.allergies && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-md">
                <p>Your health profile is incomplete. Adding more information helps improve the accuracy of AI assessments.</p>
                <button 
                  onClick={() => setEditMode(true)}
                  className="mt-2 text-blue-700 underline hover:text-blue-900"
                >
                  Complete your profile now
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Recent Activity and Actions */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Health Reports</h3>
            
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-teal-600"></div>
              </div>
            ) : recentReports.length > 0 ? (
              <div className="space-y-3">
                {recentReports.map(report => (
                  <Link 
                    href={`/health-monitor?report=${report.id}`} 
                    key={report.id}
                    className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition"
                  >
                    <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{report.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(report.createdAt)}</p>
                  </Link>
                ))}
                
                <div className="pt-2">
                  <Link 
                    href="/health-monitor" 
                    className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                  >
                    View all health reports →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">No health reports yet</p>
                <Link 
                  href="/diagnosis" 
                  className="mt-2 inline-block text-teal-600 hover:text-teal-800 text-sm font-medium"
                >
                  Get your first assessment →
                </Link>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Link 
                href="/diagnosis" 
                className="block p-3 bg-teal-50 border border-teal-200 rounded-md hover:bg-teal-100 transition"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-200 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-teal-800">New Health Assessment</h4>
                    <p className="text-xs text-teal-600">Check your symptoms</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/health-monitor" 
                className="block p-3 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 100 12 6 6 0 000-12zm-1 5a1 1 0 112 0v4a1 1 0 11-2 0V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Health Monitor</h4>
                    <p className="text-xs text-blue-600">View your health history</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}