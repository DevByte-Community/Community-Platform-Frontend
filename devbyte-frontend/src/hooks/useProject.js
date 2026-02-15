import { useState, useCallback } from 'react';
import { projectService } from '@/services/projectService';

// use Project , the hooks for the project :
// Getting all project , creating , updating and deleting project
// Managing(adding or removing) techs or contributor for a specific project

export const useProjects = (initialParams = {}) => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async (params = initialParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await projectService.getAllProjects(params);
      
      if (response.success) {
        setProjects(response.projects || []);
        setPagination(response.pagination);
      }
    } catch (err) {
      const isCorsError = 
        err.message?.toLowerCase().includes('cors') ||
        err.message?.toLowerCase().includes('blocked') ||
        (err.message === 'Network Error' && !err.response) ||
        err.name === 'TypeError' && err.message === 'Failed to fetch';
      
      if (isCorsError) {
        setError('cors');
      } else if (err.code === 'ECONNABORTED') {
        setError(408); 
      } else if (err.response?.status) {
        setError(err.response.status); 
      } else if (!err.response) {
        setError('network');
      } else {
        setError(500);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProject = useCallback(async (data) => {
    try {
      const response = await projectService.createProject(data);
      if (response.success) {
        await fetchProjects();
        return { success: true, project: response.project };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [fetchProjects]);

  const updateProject = useCallback(async (id, data) => {
    try {
      const response = await projectService.updateProject(id, data);
      if (response.success) {
        setProjects(prev => prev.map(p => p.id === id ? response.project : p));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const deleteProject = useCallback(async (id) => {
    try {
      const response = await projectService.deleteProject(id);
      if (response.success) {
        setProjects(prev => prev.filter(p => p.id !== id));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const manageTechs = useCallback(async (id, techIds, action = 'add') => {
    try {
      const response = action === 'add'
        ? await projectService.addTechs(id, techIds)
        : await projectService.removeTechs(id, techIds);
      if (response.success) {
        setProjects(prev => prev.map(p => p.id === id ? response.project : p));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const manageContributors = useCallback(async (id, userIds, action = 'add') => {
    try {
      const response = action === 'add'
        ? await projectService.addContributors(id, userIds)
        : await projectService.removeContributors(id, userIds);
      
      if (response.success) {
        setProjects(prev => prev.map(p => p.id === id ? response.project : p));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  return {
    projects,
    pagination,
    isLoading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    manageTechs,
    manageContributors,
  };
};