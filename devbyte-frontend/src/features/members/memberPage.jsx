/**
 * 
 *
 * This component serves as the container for the entire members directory,
 * managing state for filtering, searching, sorting, and displaying member cards.
 * It coordinates between the sidebar filters and the member grid display.
 * 
 * Features:
 * - Real-time search across member names and bios
 * - Multi-criteria filtering (role, skills)
 * - Dynamic sorting options
 * - Lazy loading with "Load More" functionality
 * - Modal detail view for individual members
 * - Responsive layout for mobile and desktop
 * 
 * @component
 * @example
 * return (
 *   <MemberPage />
 * )
 */


import React, { useState, useMemo } from "react";
import HeaderWrapper from "@/components/ui/Header";
import MemberModal from "./memberModal";
import MemberCard from "./memberCard";
import MemberSidebar from "./memberSidebar";
import { memberData, roles, allSkills } from "./memberData";

const MemberPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedSkill, setSelectedSkill] = useState("All Skills");
  const [sortOption, setSortOption] = useState("name-asc");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);

  // Filter and sort members based on search criteria
  const filteredMembers = useMemo(() => {
    let data = memberData.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.bio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        selectedRole === "All Roles" || member.role === selectedRole;

      const matchesSkill =
        selectedSkill === "All Skills" ||
        member.skills.includes(selectedSkill);

      return matchesSearch && matchesRole && matchesSkill;
    });

    // Sort based on selected option
    switch (sortOption) {
      case "name-asc":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "role":
        data.sort((a, b) => a.role.localeCompare(b.role));
        break;
      case "skill-count":
        data.sort((a, b) => b.skills.length - a.skills.length);
        break;
      default:
        break;
    }

    return data;
  }, [searchTerm, selectedRole, selectedSkill, sortOption]);

  const displayedMembers = filteredMembers.slice(0, displayCount);
  const hasMore = displayCount < filteredMembers.length;

  // Open modal when member card is clicked
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D1117] transition-colors duration-300">
      {/* Header Section */}
      <HeaderWrapper className="text-center">
        <div className="px-4 py-12 text-center sm:py-8">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Explore Our Community
          </h1>
          <p className="max-w-2xl mx-auto text-base text-gray-700 dark:text-gray-300 sm:text-lg">
            Discover developers, designers, and innovators building the future
          </p>
          <button
            onClick={() => alert("Redirect to /signup")}
            className="bg-[#00AEEF] text-white my-5 px-8 py-3 rounded-lg font-semibold
                       hover:bg-[#0096D6] transition-all transform hover:scale-105
                       shadow-lg hover:shadow-xl"
          >
            Join Directory
          </button>
        </div>
      </HeaderWrapper>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-col lg:flex-col">
        {/* Sidebar - Full width on mobile, fixed width on desktop */}
        <MemberSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
          sortOption={sortOption}
          setSortOption={setSortOption}
          roles={roles}
          allSkills={allSkills}
        />

        {/* Main Content Area - Takes remaining space */}
        <main className="flex-1 min-w-0">
          <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Members Grid or Empty State */}
            {displayedMembers.length > 0 ? (
              <>
                {/* Grid of member cards */}
                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {displayedMembers.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      onClick={() => handleMemberClick(member)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setDisplayCount((p) => p + 6)}
                      className="bg-gray-100 dark:bg-[#0D1117] text-gray-900 dark:text-white 
                                 border-2 border-[#00AEEF] px-8 py-3 rounded-lg font-semibold
                                 hover:bg-[#00AEEF] hover:text-white transition-all transform hover:scale-105"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Empty state when no members match filters
              <div className="py-16 text-center">
                <div className="text-gray-600 dark:text-[#8B949E] text-lg mb-2">
                  No members found
                </div>
                <p className="text-gray-400 dark:text-[#6E7681] text-sm">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Member Detail Modal */}
      <MemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MemberPage;