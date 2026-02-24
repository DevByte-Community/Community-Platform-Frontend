import { useState } from "react";
import DashboardPage from "@/features/adminDashboard/DashboardPage";
import DashboardSidebar from "@/features/adminDashboard/layout/dashboardSidebar";
import DashboardHeader from "@/features/adminDashboard/layout/dashboardHeader";
import { SelectionModal } from "@/features/adminDashboard/components/tagSelectionModal";
import {
  MOCK_BLOG_CATEGORIES,
  MOCK_EVENT_TYPES,
  MOCK_SKILLS,
  MOCK_STACKS,
} from "@/features/adminDashboard/data/otherMockData";
import { TagsManagementModal } from "@/features/adminDashboard/components/tagsManagementModal";
import { useSelector } from "react-redux";
import ManageBlogsModal from "@/components/Blogs/ManageBlogsModal";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null); // to select tags type
  const [showTagsModal, setShowTagsModal] = useState(false); // for the tag modal
  const [showManageBlogsModal, setShowManageBlogsModal] = useState(false);

  // Get user from Redux
  const profileUser = useSelector((state) => state.user.user);
  const authUser = useSelector((state) => state.auth?.user);
  const user = profileUser || authUser || null;

  // Data State Management (The tags that can be edited)
  const [skills, setSkills] = useState(MOCK_SKILLS);
  const [stacks, setStacks] = useState(MOCK_STACKS);
  const [eventTypes, setEventTypes] = useState(MOCK_EVENT_TYPES);
  const [blogCategories, setBlogCategories] = useState(MOCK_BLOG_CATEGORIES);

  // Function called after selecting a tag category from the SelectionModal.
  const handleSelectType = (type) => {
    setSelectedType(type);
    setShowTagsModal(true);
  };

  // Function called by TagsManagementModal to save the updated tags.
  const handleSaveTags = (newTags) => {
    switch (selectedType) {
      case "skills":
        setSkills(newTags);
        break;
      case "stacks":
        setStacks(newTags);
        break;
      case "events":
        setEventTypes(newTags);
        break;
      case "blogs":
        setBlogCategories(newTags);
        break;
    }
  };

  // Function to retrieve the correct tag list based on the selected type.
  const getCurrentTags = () => {
    switch (selectedType) {
      case "skills":
        return skills;
      case "stacks":
        return stacks;
      case "events":
        return eventTypes;
      case "blogs":
        return blogCategories;
      default:
        return [];
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white relative">
      {/* Sidebar */}
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onAddTagsClick={() => setShowSelectionModal(true)}
        onManageBlogsClick={() => setShowManageBlogsModal(true)} 
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} user={user} />
        <div className="flex-1 overflow-y-auto pt-16">
          <DashboardPage />
        </div>
        {/* Modals */}
        <SelectionModal
          isOpen={showSelectionModal}
          onClose={() => setShowSelectionModal(false)}
          onSelect={handleSelectType}
        />
        <TagsManagementModal
          isOpen={showTagsModal}
          onClose={() => setShowTagsModal(false)}
          type={selectedType}
          existingTags={getCurrentTags()}
          onSave={handleSaveTags}
        />
        {/* Modal Manage Blogs */}
          <ManageBlogsModal
            isOpen={showManageBlogsModal}
            onClose={() => setShowManageBlogsModal(false)}
          />
      </div>

      {/* Overlay when sidebar is open (mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
