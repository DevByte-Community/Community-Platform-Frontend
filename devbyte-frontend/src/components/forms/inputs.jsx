import { Upload , Plus, X } from "lucide-react";
import { useState } from "react";
// ==================== Form Input Components ====================

// Inputs field
export const InputField = ({ label, name, type = "text", placeholder, value, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
    />
  </div>
);

// text area field
export const TextAreaField = ({ label, name, placeholder, value, onChange, required = false, rows = 4 }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2.5 bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors resize-none"
    />
  </div>
);

// Select field
export const SelectField = ({ label, name, options, value, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2.5 bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
    >
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

// Multi-Select Field with search option
export const MultiSelectField = ({ 
  label, 
  options = [], 
  selectedIds = [], 
  onChange, 
  placeholder = "Select items...",
  required = false,
  isLoading = false,
  renderOption = null,
  renderBadge = null
}) => {
  const [searchQuery, setSearchQuery] = useState("");
   const [isOpen, setIsOpen] = useState(false);

  // Filter options when searching
  const filteredOptions = options.filter(option =>
    option.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle an option
  const toggleOption = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  // remove a selection (a contributor or something else)
  const removeSelection = (id) => {
    onChange(selectedIds.filter(selectedId => selectedId !== id));
  };

  const selectedItems = options.filter(opt => selectedIds.includes(opt.id));

  return (
    <div className="space-y-2 relative">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
        {isLoading && <span className="text-xs ml-2 text-gray-500">(Loading...)</span>}
      </label>

      {/* Selected Items Display*/}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg">
          {selectedItems.map((item) => (
            <span
              key={item.id}
              className="px-3 py-1.5 bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-full text-sm flex items-center gap-2"
            >
              {renderBadge ? renderBadge(item) : item.name}
              <button
                type="button"
                onClick={() => removeSelection(item.id)}
                className="hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full px-4 py-2.5 bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors disabled:opacity-50"
        />
        
        {/* Dropdown Options */}
        {isOpen && !isLoading && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedIds.includes(option.id);
                return (
                  <div
                    key={option.id}
                    onClick={() => toggleOption(option.id)}
                    className={`px-4 py-2.5 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      isSelected ? 'bg-cyan-50 dark:bg-cyan-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {renderOption ? renderOption(option) : (
                        <span className="text-sm text-gray-900 dark:text-white">
                          {option.name}
                        </span>
                      )}
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};


// image upload field
export const ImageUpload = ({ label, value, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/image.jpg"
        className="flex-1 px-4 py-2.5 bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
      />
      <button
        type="button"
        className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Upload size={18} />
        <span className="hidden sm:inline">Upload</span>
      </button>
    </div>
    {value && (
      <img src={value} alt="Preview" className="w-full h-32 object-cover rounded-lg mt-2" />
    )}
  </div>
);


// Tags inputs for managing lot tags 
export const TagsInput = ({ label, tags, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  // adding tags 
  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onChange([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  // removing tags 
  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          placeholder="Type and press Enter"
          className="flex-1 px-4 py-2.5 bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-full text-sm flex items-center gap-2"
          >
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:text-red-500">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
