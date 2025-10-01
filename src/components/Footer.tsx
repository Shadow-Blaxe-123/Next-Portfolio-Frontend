import { Mail } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Contact info */}
        <div className="text-center md:text-left">
          <Logo />
          <h2 className="text-xl font-bold text-primary my-2">Shamyun Ahmed</h2>
          <p>
            Email:{" "}
            <Link
              href="mailto:shamyun@example.com"
              className="text-cyan-400 hover:underline"
            >
              shamyunahmed38@gmail.com
            </Link>
          </p>
          <p>
            Phone:{" "}
            <Link
              href="tel:+8801234567890"
              className="text-cyan-400 hover:underline"
            >
              +880 01620670724
            </Link>
          </p>
        </div>

        {/* Social links */}
        <div className="flex gap-4">
          {/* GitHub SVG */}
          <Link
            href="https://github.com/Shadow-Blaxe-123"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 hover:text-white transition-colors"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </Link>

          {/* Email */}
          <Link
            href="mailto:shamunahmed38@gmail.com"
            className="hover:text-white transition-colors"
          >
            <Mail className="w-6 h-6" />
          </Link>
          {/* Facebook */}
          <Link
            href="https://www.facebook.com/shamun.ahmed.723353"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
          >
            <span className="sr-only">Facebook</span>

            <svg
              className="size-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} Shamyun Ahmed. All rights reserved.
      </div>
    </footer>
  );
}
