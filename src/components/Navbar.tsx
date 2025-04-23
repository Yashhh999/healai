"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  // Check if current page is home page
  const isHomePage = pathname === "/";

  useEffect(() => {
    setIsMounted(true);
    console.log("Auth Status:", status);
    console.log("Session Data:", session);
  }, [session, status]);

  // Initial skeleton navbar during SSR/hydration
  if (!isMounted) {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-teal-600">HealAI</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const isAuthenticated = status === "authenticated" && session;
  console.log("Is Authenticated:", isAuthenticated);
  console.log("User Image:", session?.user?.image);
  console.log("User Name:", session?.user?.name);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-teal-600">HealAI</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/diagnosis" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600">
                  Diagnosis
                </Link>
                <Link href="/health-monitor" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600">
                  Health Monitor
                </Link>
              </>
            )}
            {isHomePage && (
              <>
                <Link href="#services" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600">
                  Services
                </Link>
                <Link href="#how-it-works" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-600">
                  How It Works
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center ml-4">
                <Link href="/profile" className="flex items-center space-x-2">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                      {session.user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 ml-2">{session.user?.name}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="ml-4 px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="ml-4 px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
              >
                Sign in
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/diagnosis" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600">
                  Diagnosis
                </Link>
                <Link href="/health-monitor" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600">
                  Health Monitor
                </Link>
              </>
            )}
            {isHomePage && (
              <>
                <Link href="#services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600">
                  Services
                </Link>
                <Link href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600">
                  How It Works
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                      {session.user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{session.user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{session.user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600">
                    Your Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="mt-4 w-full flex justify-center px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}