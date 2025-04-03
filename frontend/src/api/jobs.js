import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:5000';

export const fetchJobs = async () => {
  const response = await axios.get(`${API_BASE}/jobs`);
  return response.data;
};

export const getJob = async (id) => {
  const response = await axios.get(`${API_BASE}/jobs/${id}`);
  return response.data;
};

export const addJob = async (jobData) => {
  const response = await axios.post(`${API_BASE}/add-job`, jobData);
  return response.data;
};

export const updateJob = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE}/jobs/${id}`, updatedData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`${API_BASE}/jobs/${id}`);
  return response.data;
};
