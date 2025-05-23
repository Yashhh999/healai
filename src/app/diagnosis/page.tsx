"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { generateDiagnosis } from "@/utils/ai";
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";

export default function DiagnosisPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [reportSaved, setReportSaved] = useState(false);

  // Check if user is authenticated
  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setReportSaved(false);
    
    if (!symptoms.trim()) {
      setError("Please describe your symptoms");
      return;
    }

    try {
      setIsLoading(true);
      const result = await generateDiagnosis(symptoms);
      setDiagnosis(result);
    } catch (err) {
      setError("Failed to generate diagnosis. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveReport = async () => {
    if (!diagnosis || !symptoms) return;
    
    try {
      setIsSaving(true);
      
      const response = await fetch('/api/health-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms,
          assessment: diagnosis,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save report');
      }
      
      setReportSaved(true);
      toast.success('Report saved successfully');
    } catch (err) {
      console.error('Error saving report:', err);
      toast.error('Failed to save report');
    } finally {
      setIsSaving(false);
    }
  };

  const viewAllReports = () => {
    router.push('/health-monitor');
  };

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Symptom Assessment</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Describe Your Symptoms</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
              Please describe what you&apos;re experiencing in detail:
            </label>
            <textarea
              id="symptoms"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              rows={5}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="For example: I've had a headache for the past 2 days, along with a mild fever of 99.5°F. I'm also experiencing a sore throat and fatigue."
            />
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 
              ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Analyzing Symptoms..." : "Get Assessment"}
          </button>
        </form>
      </div>
      
      {diagnosis && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Assessment Results</h2>
          <div className="prose max-w-none prose-headings:font-bold prose-headings:text-teal-700 prose-h3:text-lg prose-h2:text-xl prose-a:text-blue-600 prose-strong:text-gray-800 prose-ul:list-disc prose-ol:list-decimal">
            <ReactMarkdown>{diagnosis}</ReactMarkdown>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
            <p className="text-sm">
              <strong>Important:</strong> This assessment is generated by AI and is not a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider with any questions about a medical condition.
            </p>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={saveReport}
              disabled={isSaving || reportSaved}
              className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${reportSaved 
                  ? "bg-green-600 cursor-not-allowed" 
                  : "bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"}`}
            >
              {isSaving ? "Saving..." : reportSaved ? "Saved to Health Records" : "Save to Health Records"}
            </button>
            
            <button
              onClick={viewAllReports}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              View All Health Reports
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">How To Get The Most Accurate Assessment</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Be specific about your symptoms (location, intensity, duration)</li>
          <li>Mention when symptoms started and if they've changed</li>
          <li>Include relevant medical history if applicable</li>
          <li>Note any medications you're currently taking</li>
          <li>Describe any factors that worsen or improve symptoms</li>
        </ul>
      </div>
    </main>
  );
}