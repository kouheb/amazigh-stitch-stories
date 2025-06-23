
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center mb-4">
                <Logo size="sm" showText={true} />
              </Link>
              <p className="text-gray-600 text-sm max-w-md">
                Connecting Amazigh artisans and preserving traditional crafts through community, learning, and collaboration.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Platform
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/app" className="text-gray-600 hover:text-gray-900 text-sm">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/membership" className="text-gray-600 hover:text-gray-900 text-sm">
                    Membership
                  </Link>
                </li>
                <li>
                  <Link to="/messaging" className="text-gray-600 hover:text-gray-900 text-sm">
                    Messages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900 text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Amazigh Nations. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <p className="text-gray-500 text-sm">
                  Made with ❤️ for Amazigh heritage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
