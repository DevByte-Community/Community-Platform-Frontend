import apiFetch from "./api";

const normalizeBlog = (blog = {}) => ({
  ...blog,
  id: blog.id || blog._id,
  image:
    blog.image ||
    blog.coverImage ||
    blog.thumbnail ||
    blog.featuredImage ||
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80",
  category: blog.category || blog.topic || "General",
  title: blog.title || "Untitled post",
  description: blog.description || blog.excerpt || "",
});

export const blogService = {
  getAllBlogs: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            acc[key] = value;
          }
          return acc;
        }, {}),
      ).toString();

      const response = await apiFetch(
        `/blogs${queryString ? `?${queryString}` : ""}`,
      );

      return {
        blogs: Array.isArray(response?.blogs)
          ? response.blogs.map(normalizeBlog)
          : [],
        pagination: response?.pagination || {},
      };
    } catch (error) {
      const serviceError = new Error(error?.message || "Failed to fetch blogs");
      serviceError.status = error?.status;
      serviceError.response = error?.response;
      throw serviceError;
    }
  },

  createBlogPost: async (payload = {}) => {
    try {
      const blogPayload = {
        title: payload.title?.trim(),
        description: payload.description?.trim(),
        coverImage: payload.coverImage,
        topic: payload.topic?.trim(),
        featured: Boolean(payload.featured),
      };

      return await apiFetch("/blogs", {
        method: "POST",
        body: JSON.stringify(blogPayload),
      });
    } catch (error) {
      const serviceError = new Error(
        error?.message || "Failed to create blog post",
      );
      serviceError.status = error?.status;
      serviceError.response = error?.response;
      throw serviceError;
    }
  },
};

export default blogService;
