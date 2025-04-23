import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-teal-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                AI-Powered <span className="text-teal-600">Medical Diagnostics</span> For Everyday Health Concerns
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                Get quick and reliable guidance for common health issues using our advanced AI diagnostic tool. Available 24/7, no waiting rooms needed.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/signin" className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 text-center">
                  Get Started
                </Link>
                <Link href="#how-it-works" className="px-6 py-3 bg-white border border-teal-600 text-teal-600 font-medium rounded-md hover:bg-teal-50 text-center">
                  Learn How It Works
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative h-72 w-72 md:h-96 md:w-96">
                <Image 
                  src="/globe.svg" 
                  alt="Medical AI Technology" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              HealAI provides AI-powered healthcare services to help you quickly assess common health concerns
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-teal-100 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Symptom Assessment</h3>
              <p className="mt-2 text-gray-600">
                Describe your symptoms and get an AI-powered analysis of potential causes and recommended next steps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-teal-100 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Health Monitoring</h3>
              <p className="mt-2 text-gray-600">
                Track your health concerns over time and get insights on your progress and potential actions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-teal-100 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Health Information</h3>
              <p className="mt-2 text-gray-600">
                Access a comprehensive database of health conditions, treatments, and preventive measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI diagnostic process is simple, secure, and designed with your health in mind
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-16 left-0 w-full border-t-2 border-teal-200 border-dashed z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="relative bg-white p-6 rounded-lg shadow-md z-10">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-16 w-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">1</div>
                  <h3 className="mt-8 text-xl font-medium text-gray-900 text-center">Create an Account</h3>
                  <p className="mt-2 text-gray-600 text-center">
                    Sign up with your Google account to get started with HealAI.
                  </p>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md z-10">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-16 w-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">2</div>
                  <h3 className="mt-8 text-xl font-medium text-gray-900 text-center">Describe Your Symptoms</h3>
                  <p className="mt-2 text-gray-600 text-center">
                    Tell us about your health concerns in detail through our guided interface.
                  </p>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md z-10">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-16 w-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">3</div>
                  <h3 className="mt-8 text-xl font-medium text-gray-900 text-center">Get AI Analysis</h3>
                  <p className="mt-2 text-gray-600 text-center">
                    Our AI processes your information and provides a preliminary assessment.
                  </p>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md z-10">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-16 w-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">4</div>
                  <h3 className="mt-8 text-xl font-medium text-gray-900 text-center">Review Recommendations</h3>
                  <p className="mt-2 text-gray-600 text-center">
                    Get insights, next steps, and determine if you need to see a healthcare provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose HealAI</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing accurate, accessible, and secure healthcare guidance
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Advanced AI Technology</h3>
              <p className="mt-2 text-gray-600 text-center">
                Our system is powered by state-of-the-art AI models specifically tuned for healthcare.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Privacy First</h3>
              <p className="mt-2 text-gray-600 text-center">
                Your health data is encrypted, secure, and never shared without your explicit permission.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">24/7 Availability</h3>
              <p className="mt-2 text-gray-600 text-center">
                Get healthcare guidance any time of day or night, whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-xl text-teal-100 max-w-2xl mx-auto">
            Join thousands of users who trust HealAI for their everyday health concerns
          </p>
          <div className="mt-8">
            <Link href="/signin" className="px-8 py-3 bg-white text-teal-600 font-medium rounded-md hover:bg-teal-50 inline-block">
              Sign Up Now
            </Link>
          </div>
          <p className="mt-4 text-sm text-teal-200">
            No credit card required. Start with a free assessment today.
          </p>
        </div>
      </section>
    </main>
  );
}