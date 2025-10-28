/**
 * * Provides a collapsible sidebar on mobile (slide-in overlay) and a vertical sidebar on desktop.
 *  Contains all filter controls including search,
 * role selection, skill filtering, and sort options.
 */

import React, { useState } from "react";
import MemberFilter from "./memberFilter";

const MemberSidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Toggle Button - Mobile only */}
      <button
        className="lg:hidden fixed top-20 left-0 z-40 p-2 bg-white dark:bg-gray-900 rounded-r-lg shadow-lg border border-gray-200 dark:border-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open Sidebar"}
      >
        {isSidebarOpen ? "❮" : "❯"}
      </button>

      {/* Sidebar Drawer - Mobile */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 w-8/12 sm:w-6/12 bg-white dark:bg-[#0D1117]
                    border-r border-gray-200 dark:border-gray-700 transform transition-transform
                    duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:hidden`}
      >
        <div className="p-4 overflow-y-auto h-full">
          <MemberFilter {...props} />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Filter Box - Desktop */}
      <div className="hidden lg:flex justify-center z-20 bg-transparent">
        <div
          className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-gray-700
                     rounded-2xl shadow-lg px-6 py-3 w-[80%] max-w-6xl"
        >
          <MemberFilter {...props} />
        </div>
      </div>
    </>
  );
};

export default MemberSidebar;
