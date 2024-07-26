const BASE_URL = 'https://striveschool-api.herokuapp.com/api/profile';
const TOKEN = process.env.REACT_APP_JWT_TOKEN;

const fetchData = async (url, options) => {
  try {
   
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchCurrentUser = async () => {
  const url = `${BASE_URL}/me`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  return fetchData(url, options);
};

export const fetchUserProfile = async (userId) => {
  const url = userId ? `${BASE_URL}/${userId}` : `${BASE_URL}/me`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  return fetchData(url, options);
};

export const fetchProfiles = async () => {
  const url = BASE_URL;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  return fetchData(url, options);
};

export const addExperience = async (userId, experience) => {
  const url = `${BASE_URL}/${userId}/experiences`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(experience),
  };
  return fetchData(url, options);
};

export const updateExperience = async (userId, experienceId, experience) => {
  const url = `${BASE_URL}/${userId}/experiences/${experienceId}`;
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(experience),
  };
  return fetchData(url, options);
};

export const deleteExperience = async (userId, experienceId) => {
  const url = `${BASE_URL}/${userId}/experiences/${experienceId}`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  return fetchData(url, options);
};
export const fetchExperiences = async (userId) => {
  const url = `${BASE_URL}/${userId}/experiences`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  return fetchData(url, options);
};
export const uploadProfileImage = async (userId, imageFile) => {
  const url = `${BASE_URL}/${userId}/picture`; 
  const formData = new FormData();
  formData.append('profile', imageFile); 

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      
    },
    body: formData,
  };

  return fetchData(url, options);
};
