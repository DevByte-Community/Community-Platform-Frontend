import { useState, useEffect } from "react";
import { Trash2, Search, Loader2, X, BookOpen } from "lucide-react";

/**
 * ManageBlogsModal
 * ─────────────────────────────────────────
 * TODO:
 *  1. Replace MOCK_BLOGS + local state with real API calls
 *  2. fetchBlogs()  → GET  /api/v1/blogs?page=X&pageSize=6
 *  3. handleDelete() → DELETE /api/v1/blogs/:id
 *  4. Wire up pagination to API (currentPage, totalPages from response)
 */

const MOCK_BLOGS = [
  { id: "1", title: "Getting Started with React 19", category: "Development", coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=160&fit=crop", createdAt: "2025-01-10" },
  { id: "2", title: "Mastering Tailwind CSS in 2025", category: "Design", coverImage: "https://images.unsplash.com/photo-1587620962725-abab19836100?w=400&h=160&fit=crop", createdAt: "2025-01-15" },
  { id: "3", title: "Building REST APIs with Node.js", category: "Backend", coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=160&fit=crop", createdAt: "2025-01-20" },
  { id: "4", title: "Introduction to TypeScript", category: "Development", coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=160&fit=crop", createdAt: "2025-01-25" },
  { id: "5", title: "DevOps for Frontend Developers", category: "DevOps", coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=160&fit=crop", createdAt: "2025-02-01" },
  { id: "6", title: "UI/UX Principles Every Dev Should Know", category: "Design", coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=160&fit=crop", createdAt: "2025-02-05" },
];

const ManageBlogsModal = ({ isOpen, onClose }) => {
  const [blogs, setBlogs] = useState(MOCK_BLOGS); //  use the API fetch herre
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!isOpen) { setSearch(""); setConfirmId(null); }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      // use await blogService.deleteBlog(id);
      await new Promise((r) => setTimeout(r, 600));
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setConfirmId(null);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Manage Blogs</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setConfirmId(null); }}
              placeholder="Search by title or category…"
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/40 transition-colors"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <BookOpen size={32} className="mb-2 opacity-40" />
              <p className="text-sm">{search ? `No results for "${search}"` : "No blog posts yet"}</p>
            </div>
          ) : (
            filtered.map((blog) => (
              <div key={blog.id} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Blog row */}
                <div className="flex items-center gap-4 p-3 bg-white dark:bg-[#0d1117] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    onError={(e) => { e.target.src = "https://placehold.co/64x64/1f2937/9ca3af?text=Blog"; }}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{blog.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#00AEEF]/15 text-[#00AEEF] font-medium">{blog.category}</span>
                      <span className="text-xs text-gray-400">{blog.createdAt}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setConfirmId(confirmId === blog.id ? null : blog.id)}
                    disabled={!!deletingId}
                    className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-30"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Inline confirm */}
                {confirmId === blog.id && (
                  <div className="flex items-center justify-between gap-3 px-4 py-3 bg-red-500/8 border-t border-red-500/20">
                    <p className="text-xs text-red-400">Delete this post? This cannot be undone.</p>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setConfirmId(null)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deletingId === blog.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60"
                      >
                        {deletingId === blog.id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                        {deletingId === blog.id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ManageBlogsModal;