import { ModeToggle } from "./mode-toggle"; // Component to toggle light/dark mode
import { Link, Outlet } from "react-router-dom"; // React Router components for navigation and nested routes

import { GraduationCap } from "lucide-react"; // Icon component

export default function LayoutPage() {
  return (
    <div>
      <header className="flex justify-between items-center h-20 px-4 md:px-6">
        <div className="flex items-center">
          {" "}
          <div className="mr-12">
            <Link to="/">
              <GraduationCap className="h-8 w-8" />
            </Link>
          </div>
          <div></div>
        </div>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </header>
      <main className="flex justify-center items-center h-screen">
        <Outlet />
      </main>
      <footer className="flex justify-center items-center h-16 bg-gray-100 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 | NEIU Research Project Test | Submission by Deep Mandloi
        </p>{" "}
      </footer>
    </div>
  );
}
