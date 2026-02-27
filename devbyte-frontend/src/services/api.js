const API_BASE_URL = 'https://community-api-backend.onrender.com/api/v1';

//Intelligent fetch wrapper
// Automatically handles JSON and Multipart/Form-Data

const apiFetch = async (endpoint, options = {}) => {
  const headers = { ...options.headers };

  // If the body is NOT FormData, we default to JSON
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  
  // NOTE: If body IS FormData, we MUST NOT set Content-Type.
  const config = {
    ...options,
    headers,
    credentials: 'include', // Send cookies (JWT) for authentication
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  // Handle empty responses
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(data?.message || 'Something went wrong');
    error.status = response.status;
    error.response = response;
    throw error;
  }

  return data;
};

export default apiFetch;