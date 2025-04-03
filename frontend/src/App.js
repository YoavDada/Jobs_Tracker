import React, { useEffect, useState } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import { fetchJobs, addJob, deleteJob, updateJob } from './api/jobs';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  const handleAddJob = async (jobData) => {
    await addJob(jobData);
    const updated = await fetchJobs();
    setJobs(updated);
  };

  const handleEditJob = async (id, updatedData) => {
    await updateJob(id, updatedData);
    const updated = await fetchJobs();
    setJobs(updated);
  };
  

  const handleStatusChange = async (id, newStatus) => {
    await updateJob(id, { in_progress: newStatus });
    const refreshed = await fetchJobs();
    setJobs(refreshed);
  };

  const handleDeleteJob = async (id) => {
    await deleteJob(id);
    const updated = await fetchJobs();
    setJobs(updated);
  };

  return (
    <div className="custom-background min-vh-100">
      <div className="App">
        <h1>Job Tracker</h1>
        <div className="container transparent-container">
          <JobForm onAdd={handleAddJob} />
          <JobList
            jobs={jobs}
            onDelete={handleDeleteJob}
            onStatusChange={handleStatusChange}
            onEdit={handleEditJob}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

