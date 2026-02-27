import { useState } from "react";
import { TextAreaField, InputField, MultiSelectField, ImageUpload } from "@/components/forms/inputs";
import { Modal } from "@/components/forms/modal";
import { useProjects } from "@/hooks/useProject";
import { useTechs } from "@/hooks/useTech";
import { useMembers } from "@/hooks/useMembers";

export const AddProjectModal = ({ isOpen, onClose }) => {
  const { createProject } = useProjects();
  const { techs, isLoading: techsLoading } = useTechs();
  const { members, isLoading: membersLoading } = useMembers(1, 100);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Initial state setup
  const initialFormState = {
    title: '',
    description: '',
    repoLink: '',
    featured: false,
    techs: [],
    coverImage: '',
    contributors: [],
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      /**
       * Prepare payload. 
       * If coverImage is an empty string, we remove it to avoid 
       * the "coverImage is not allowed" validation error in JSON mode.
       */
      const payload = {
        title: formData.title,
        description: formData.description,
        repoLink: formData.repoLink,
        featured: formData.featured,
        techs: formData.techs,
        contributors: formData.contributors,
      };

      // Only include coverImage if it actually has a value (File or URL)
      if (formData.coverImage) {
        payload.coverImage = formData.coverImage;
      }

      const result = await createProject(payload);

      if (result.success) {
        setFormData(initialFormState);
        onClose();
      } else {
        // Handle logic errors returned by the hook (success: false)
        setError(Array.isArray(result.error) ? result.error.join(', ') : result.error);
      }
    } catch (err) {
      // Handle unexpected exceptions
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Project">
      <form onSubmit={handleSubmit} className="space-y-4 w-full mx-auto">
        
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            {error}
          </div>
        )}

        <InputField
          label="Project Title"
          name="title"
          placeholder="Enter project name"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextAreaField
          label="Description"
          name="description"
          placeholder="Describe your project..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <MultiSelectField
          label="Technologies"
          options={techs}
          selectedIds={formData.techs}
          onChange={(newTechs) => setFormData({ ...formData, techs: newTechs })}
          placeholder="Search technologies..."
          isLoading={techsLoading}
          renderOption={(tech) => (
            <div className="flex items-center gap-2">
              {tech.icon && <img src={tech.icon} alt="" className="w-5 h-5 object-contain"/>}
              <span>{tech.name}</span>
            </div>
          )}
          renderBadge={(tech) => (
            <div className="flex items-center gap-1">
              {tech.icon && <img src={tech.icon} alt="" className="w-4 h-4 object-contain"/>}
              <span>{tech.name}</span>
            </div>
          )}
        />

        <ImageUpload
          label="Project Cover Image"
          value={formData.coverImage}
          onChange={(fileOrUrl) => setFormData({ ...formData, coverImage: fileOrUrl })}
        />

        <InputField
          label="GitHub Repository"
          name="repoLink"
          type="url"
          placeholder="https://github.com/username/repo"
          value={formData.repoLink}
          onChange={handleChange}
        />

        <MultiSelectField
          label="Contributors"
          options={members}
          selectedIds={formData.contributors}
          onChange={(newMembers) => setFormData({ ...formData, contributors: newMembers })}
          placeholder="Search members..."
          isLoading={membersLoading}
          renderOption={(m) => (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                {m.profilePicture ? 
                  <img src={m.profilePicture} alt="" className="w-full h-full object-cover"/> : 
                  <div className="flex items-center justify-center h-full text-xs">?</div>
                }
              </div>
              <div>
                <p className="text-sm font-medium">{m.fullname}</p>
                <p className="text-xs text-gray-500">{m.email}</p>
              </div>
            </div>
          )}
          renderBadge={(m) => <span>{m.fullname}</span>}
        />

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg">
          <div>
            <label className="text-sm font-medium">Featured Project</label>
            <p className="text-xs text-gray-500">Show at the top of the list</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, featured: !formData.featured })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.featured ? "bg-cyan-500" : "bg-gray-300 dark:bg-gray-600"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.featured ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 font-medium"
          >
            {isSubmitting ? 'Creating...' : 'Add Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
};