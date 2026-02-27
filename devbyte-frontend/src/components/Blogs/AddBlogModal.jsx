import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

// the modal template
import { Modal } from "../forms/modal";
// Import form field components
import {
  TextAreaField,
  InputField,
  SelectField,
  ImageUpload,
} from "../forms/inputs";

const BaseUrl = import.meta.env.VITE_API_BASE_URL;

// ==================== Add Blog Modal ====================
export const AddBlogModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
    coverImage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Static array defining the available blog categories for the SelectField
  const categories = [
    { name: "Select Category", value: "" }, // default placeholder
    { name: "Technology", value: "Technology" },
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.topic ||
      !formData.coverImage.trim()
    ) {
      toast.error("All fields are required. Please fill in all the details.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        coverImage: formData.coverImage,
        topic: formData.topic,
      };

      const response = await axios.post(
        `${BaseUrl}/v1/blogs`,
        {
          title: formData.title,
          description:
            formData.description.length > 100
              ? formData.description.substring(0, 100) + "..."
              : formData.description,
          coverImage: formData.coverImage,
          topic: formData.topic,
          featured: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        },
      );

      toast.success("Blog post created successfully!");
      // Reset form
      setFormData({
        title: "",
        description: "",
        topic: "",
        coverImage: "",
      });
      onClose();
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create blog post. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Blog Post">
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Blog Title Input Field */}
        <InputField
          label="Blog Title"
          name="title"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={handleChange}
          required
        />

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

        {/* Category Selector Dropdown */}
        <SelectField
          label="Category"
          name="topic"
          options={categories}
          value={formData.topic}
          onChange={handleChange}
          required
        />

        <ImageUpload
          label="Featured Image"
          value={formData.coverImage}
          onChange={(value) => setFormData({ ...formData, coverImage: value })}
          required
        />

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
            className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// My own

// import { useState } from "react";

// // the modal template
// import { Modal } from "../forms/modal";
// // Import form field components
// import {
//   TextAreaField,
//   InputField,
//   SelectField,
//   ImageUpload,
// } from "../forms/inputs";
// import axios from "axios";

// // ==================== Add Blog Modal ====================
// export const AddBlogModal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     image: "",
//   });

//   // Static array defining the available blog categories for the SelectField
//   const categories = [
//     { name: "Select Category", value: "" }, // default placeholder
//     { name: "Development", value: "Development" },
//     { name: "Design", value: "Design" },
//     { name: "Tutorial", value: "Tutorial" },
//     { name: "AI/ML", value: "AI/ML" },
//     { name: "DevOps", value: "DevOps" },
//     { name: "Security", value: "Security" },
//     { name: "Frontend", value: "Frontend" },
//     { name: "Performance", value: "Performance" },
//     { name: "Testing", value: "Testing" },
//     { name: "Mobile", value: "Mobile" },
//   ];

//   // EVENT HANDLER: Handles changes for standard input fields (text, select, url)
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const BaseUrl = import.meta.env.VITE_API_BASE_URL;

//   const CreateBlogPost = async () => {
//     try {
//       const res = await axios.post(
//         `${BaseUrl}/v1/blogs`,
//         {
//           title: formData.title,
//           description:
//             formData.description.length > 100
//               ? formData.description.substring(0, 100) + "..."
//               : formData.description,
//           coverImage: "https://example.com/images/blog-cover.jpg",
//           topic: formData.category,
//           featured: false,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: "include",
//         },
//       );
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Blog Data:", formData);
//     // API call here
//     CreateBlogPost();
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Create Blog Post">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Blog Title Input Field */}
//         <InputField
//           label="Blog Title"
//           name="title"
//           placeholder="Enter blog title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />

//         {/* Description Text Area */}
//         <TextAreaField
//           label="Description"
//           name="description"
//           placeholder="Write a brief description..."
//           value={formData.description}
//           onChange={handleChange}
//           required
//           rows={4}
//         />

//         {/* Category Selector Dropdown */}
//         <SelectField
//           label="Category"
//           name="category"
//           options={categories}
//           value={formData.category}
//           onChange={handleChange}
//           // required
//         />

//         <ImageUpload
//           label="Featured Image"
//           value={formData.image}
//           onChange={(value) => setFormData({ ...formData, image: value })}
//           // required
//         />

//         {/* Action Buttons Container (responsive layout using flex) */}
//         <div className="flex flex-col sm:flex-row gap-3 pt-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
//           >
//             Publish Post
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };
