import { useState } from "react";
import { toast } from "react-hot-toast";
import blogService from "@/services/blogServices";

// the modal template
import { Modal } from "../forms/modal";
// Import form field components
import {
  TextAreaField,
  InputField,
  SelectField,
  ImageUpload,
} from "../forms/inputs";

// ==================== Add Blog Modal ====================
export const AddBlogModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
    coverImage: "",
    featured: false,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Static array defining the available blog categories for the SelectField
  const categories = [
    { name: "Select Category", value: "" }, // default placeholder
    { name: "Development", value: "Development" },
    { name: "Design", value: "Design" },
    { name: "Tutorial", value: "Tutorial" },
    { name: "AI/ML", value: "AI/ML" },
    { name: "DevOps", value: "DevOps" },
    { name: "Security", value: "Security" },
    { name: "Frontend", value: "Frontend" },
    { name: "Performance", value: "Performance" },
    { name: "Testing", value: "Testing" },
    { name: "Mobile", value: "Mobile" },
  ];

  // EVENT HANDLER: Handles changes for standard input fields (text, select, url)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.title.trim()) nextErrors.title = "Blog title is required";
    if (!formData.description.trim())
      nextErrors.description = "Description is required";
    if (!formData.topic.trim()) nextErrors.topic = "Category is required";

    const hasImage =
      formData.coverImage instanceof File ||
      (typeof formData.coverImage === "string" &&
        formData.coverImage.trim() !== "");

    if (!hasImage) nextErrors.coverImage = "Featured image is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      topic: "",
      coverImage: "",
      featured: false,
    });
    setErrors({});
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitError(
        "All input fields are compulsory. Please fill all required fields.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      await blogService.createBlogPost({
        title: formData.title,
        description: formData.description,
        coverImage: formData.coverImage,
        topic: formData.topic,
        featured: formData.featured,
      });

      toast.success("Blog post created successfully");
      resetForm();
      onClose();
    } catch (error) {
      setSubmitError(error?.message || "Failed to create blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Blog Post">
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            {submitError}
          </div>
        )}

        {/* Blog Title Input Field */}
        <InputField
          label="Blog Title"
          name="title"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}

        {/* Description Text Area */}
        <TextAreaField
          label="Description"
          name="description"
          placeholder="Write a brief description..."
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}

        {/* Category Selector Dropdown */}
        <SelectField
          label="Category"
          name="topic"
          options={categories}
          value={formData.topic}
          onChange={handleChange}
          required
        />
        {errors.topic && <p className="text-sm text-red-500">{errors.topic}</p>}

        <ImageUpload
          label="Featured Image"
          value={formData.coverImage}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, coverImage: value }));
            setErrors((prev) => ({ ...prev, coverImage: "" }));
          }}
          required
        />
        {errors.coverImage && (
          <p className="text-sm text-red-500">{errors.coverImage}</p>
        )}

        {/* Action Buttons Container (responsive layout using flex) */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
