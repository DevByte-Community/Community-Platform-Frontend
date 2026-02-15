import React from "react";
import { Search, Bell, Menu } from 'lucide-react';
import { getMemberAvatar } from "@/services/membersService";
import { useNavigate } from "react-router-dom";

// SearchBar Component
const SearchBar = () => {

  return (
    // Container for the search input and icon
    <div className="relative">
      {/* Search Icon positioned inside the input field */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 
      text-gray-500 dark:text-gray-500" size={24} />
      
      {/* Input Field with theme styling */}
      <input
        type="text"
        placeholder="Search"
        // Styling: padding for the icon, focus effect, and dynamic theme classes
        className="w-2 md:w-11/12 border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 
             bg-white border-gray-200 text-gray-900 focus:ring-blue-500
            dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:focus:ring-cyan-500 "
      />
    </div>
  );
};

// NotificationButton Component
const NotificationButton = () => {
  
    return (
    // Button container with hover effect
    <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
      {/* Bell Icon, color dynamic based on theme */}
      <Bell size={20} className="text-gray-600 dark:text-gray-400" />
      
      {/* Small red dot indicating a notification count/alert */}
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
    </button>
  );
};

// UserAvatar Component (Displays initials 'AK' as a placeholder)
const UserAvatar = ({ user }) => {
  const initials = user?.fullname 
    ? user.fullname.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : "..";

  const avatarUrl = getMemberAvatar(user);
  const hasImage = user?.profilePicture || user?.profile_picture;
  const navigate = useNavigate();

  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold overflow-hidden border-2
     border-white dark:border-slate-800 shadow-sm"
     onClick={() => navigate("/profile")}>
      {hasImage ? (
        <img 
          src={avatarUrl} 
          alt={user?.fullname} 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
// Header Component (Main container for the dashboard header)
const DashboardHeader = ({ setSidebarOpen , user }) => {
  return (
    <div className="border-b px-8 py-4 bg-white border-gray-200 dark:bg-[#161b22] dark:border-slate-800 sm:w-10/12 fixed z-10">
      <div className="flex items-center justify-between">

        {/* LEFT : HAMBURGER + TITLE */}
        <div className="flex items-center gap-2 sm:gap-5">
          {/* HAMBURGER only on mobile */}
          <button
            className="lg:hidden p-1 rounded-lg  hover:bg-gray-200 dark:hover:bg-slate-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} className="text-black bg-white dark:text-white dark:bg-[#161b22]" />
          </button>

          <h1 className="text-sm sm:text-2xl font-bold text-blue-600 dark:text-blue-600">
            Dashboard Overview
          </h1>
        </div>

        {/* RIGHT : Search, notif, avatar */}
        <div className="flex items-center gap-3">
          <SearchBar />
          <NotificationButton />
          <UserAvatar user={user} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;