import { useState, useEffect } from "react";
// import necessary fields from the basics input component
import { TextAreaField, InputField , MultiSelectField, ImageUpload  } from "@/components/forms/inputs";
// the Modals template
import { Modal } from "@/components/forms/modal";

import { useProjects } from "@/hooks/useProject";
import { useTechs } from "@/hooks/useTech";
import { useMembers } from "@/hooks/useMembers";

// ==================== Add Project Modal ====================
export const AddProjectModal = ({ isOpen, onClose }) => {

  const { createProject } = useProjects();
  const { techs, isLoading: techsLoading } = useTechs();
  const { members, isLoading: membersLoading } = useMembers(1, 100);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
    // form data for the project 
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    repoLink: '',
    featured: false,
    techs: [],
    coverImage: '',
    contributors: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // action to be performed when submiting data 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        repoLink: formData.repoLink,
        techIds: formData.techs,
        contributorIds: formData.contributors,
        featured: formData.featured,
        coverImage: formData.coverImage,
      };

      const result = await createProject(projectData);

      if (result.success) {
        // reset the form
        setFormData({
          title: '',
          description: '',
          repoLink: '',
          featured: false,
          techs: [],
          coverImage: '',
          contributors: [],
        });
        onClose();
      } else {
        setError(result.error || 'Failed to create project');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Project">
      <form onSubmit={handleSubmit} className="space-y-4 w-full mx-auto">
        { /** title input field */}
        <InputField
          label="Project Title"
          name="title"
          placeholder="Enter project name"
          value={formData.title}
          onChange={handleChange}
          required
        />
            { /** Description text area field */}
        <TextAreaField
          label="Description"
          name="description"
          placeholder="Describe your project..."
          value={formData.description}
          onChange={handleChange}
          required
        />
        { /** select technolgies , multiselect field */}
        <MultiSelectField
          label="Technologies"
          options={techs}
          selectedIds={formData.techs}
          onChange={(newTechs) => setFormData({ ...formData, techs: newTechs })}
          placeholder="Type to search technologies..."
          isLoading={techsLoading}
          required
          renderOption={(tech) => (
            <div className="flex items-center gap-2">
              {tech.iconUrl && (
                <img src={tech.iconUrl} alt={tech.name} className="w-5 h-5 object-contain"/>
              )}
              <span>{tech.name}</span>
            </div>
          )}
          renderBadge={(tech) => (
            <>
              {tech.iconUrl && (
                <img src={tech.iconUrl} alt={tech.name} className="w-4 h-4 object-contain"/>
              )}
              {tech.name}
            </>
          )}
        />

        <ImageUpload
          label="Project Image"
          value={formData.coverImage}
          onChange={(value) => setFormData({ ...formData, image: value })}
        />
        { /** github repository input field */}
        <InputField
          label="GitHub Repository"
          name="github"
          type="url"
          placeholder="https://github.com/username/repo"
          value={formData.repoLink}
          onChange={handleChange}
        />
            { /** Contributors of the project */}
        <MultiSelectField
          label="Contributors"
          options={members}
          selectedIds={formData.contributors}
          onChange={(newContributors) => setFormData({ ...formData, contributors: newContributors })}
          placeholder="Type to search contributors..."
          isLoading={membersLoading}
          renderOption={(member) => (
            <div className="flex items-center gap-2">
              {member.profile_picture ? (
                <img src={member.profile_picture} alt={member.fullname || member.name} className="w-8 h-8 rounded-full object-cover"/>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {(member.fullname || member.name || '?')[0].toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{member.fullname || member.name}</p>
                {member.email && <p className="text-xs text-gray-500">{member.email}</p>}
              </div>
            </div>
          )}
          renderBadge={(member) => (
            <>
              {member.profile_picture && (
                <img src={member.profile_picture} alt={member.fullname || member.name} className="w-4 h-4 rounded-full object-cover"
                />
              )}
              {member.fullname || member.name}
            </>
          )}
        />

    {/* Featured Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Featured Project
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Show at the top of the list
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, featured: !formData.featured })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.featured ? "bg-cyan-500" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.featured ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || formData.techs.length === 0}
            className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium disabled:opacity-50" 
          >
            {isSubmitting ? 'Creating...' : 'Add Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
