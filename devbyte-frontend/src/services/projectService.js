import apiFetch from './api';


export const projectService = {
  // Get all projects with pagination and filters
  getAllProjects: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiFetch(`/projects?${queryString}`);
  },

  // Get a project by his id
  getProjectById: async (id) => {
    return apiFetch(`/projects/${id}`);
  },

  // Create project
  createProject: async (data) => {
    const hasFile = data.coverImage instanceof File;

    if (hasFile) {
      const formData = new FormData();
      
      formData.append('title', data.title);
      formData.append('description', data.description);
      if (data.repoLink) formData.append('repoLink', data.repoLink);
      formData.append('featured', data.featured);
      formData.append('techs', JSON.stringify(data.techs || []));
      formData.append('contributors', JSON.stringify(data.contributors || []));

      formData.append('coverImage', data.coverImage);

      return apiFetch('/projects', {
        method: 'POST',
        body: formData,
      });
    }

    // if it's not a file , it 's an url 
    const { coverImage, ...jsonData } = data;
    return apiFetch('/projects', {
      method: 'POST',
      body: JSON.stringify(jsonData),
    });
  },

  // Update a project
  updateProject: async (id, data) => {
    return apiFetch(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Delete aproject
  deleteProject: async (id) => {
    return apiFetch(`/projects/${id}`, {
      method: 'DELETE',
    });
  },


  // Add techs to a project 
  addTechs: async (id, techIds) => {
    return apiFetch(`/projects/${id}/techs`, {
      method: 'POST',
      body: JSON.stringify({ techIds }),
    });
  },

  // Remove techs from a project
  removeTechs: async (id, techIds) => {
    return apiFetch(`/projects/${id}/techs`, {
      method: 'DELETE',
      body: JSON.stringify({ techIds }),
    });
  },

  // Add contributors to a project
  addContributors: async (id, userIds) => {
    return apiFetch(`/projects/${id}/contributors`, {
      method: 'POST',
      body: JSON.stringify({ userIds }),
    });
  },

  // Remove contributors from a project
  
  removeContributors: async (id, userIds) => {
    return apiFetch(`/projects/${id}/contributors`, {
      method: 'DELETE',
      body: JSON.stringify({ userIds }),
    });
  },
};