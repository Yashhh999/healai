import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-teal-600">HealAI</h2>
            <p className="mt-2 text-sm text-gray-600">
              AI-powered medical diagnostics for minimal health issues.
              Quick, reliable, and accessible healthcare guidance.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-base text-gray-600 hover:text-teal-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-base text-gray-600 hover:text-teal-600">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-base text-gray-600 hover:text-teal-600">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-base text-gray-600 hover:text-teal-600">
                  Your Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-base text-gray-600 hover:text-teal-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-600 hover:text-teal-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-600 hover:text-teal-600">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} HealAI. All rights reserved.
            <span className="block md:inline md:ml-2">This service is not a replacement for professional medical advice.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}