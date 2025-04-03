import React, { useState } from 'react';

const JobItem = ({ job, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    company: job.company,
    position: job.position,
    applied_date: job.applied_date,
    job_post_link: job.job_post_link || ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(job.id, form);
    setIsEditing(false);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
      background: '#fff',
      cursor: isEditing ? 'default' : 'grab'
    }}>
      {isEditing ? (
        <div>
          <input name="company" value={form.company} onChange={handleChange} placeholder="Enter Company" className="form-control center-placeholder" />
          <input name="position" value={form.position} onChange={handleChange} placeholder="Enter Position" className="form-control center-placeholder"/>
          <input type="date" name="applied_date" value={form.applied_date} onChange={handleChange} className="form-control"/>
          <input name="job_post_link" value={form.job_post_link} onChange={handleChange} placeholder="Enter Link (optional)" className="form-control center-placeholder"/>
          <div style={{ marginTop: '8px' }}>
            <button onClick={handleSave} class="btn btn-success">Save</button>
            <button onClick={() => setIsEditing(false)} class="btn btn-danger">Cancel</button>
          </div>
        </div>
      ) : (

        <div>
          <div>
            <h3>{job.company} – {job.position}</h3>
            <p>Applied on: {job.applied_date}</p>
            {job.job_post_link && (
              <p>
                <a href={job.job_post_link} target="_blank" rel="noopener noreferrer">
                  View Job Post
                </a>
              </p>
            )}
          </div>
          <div style={{ marginTop: '8px' }}>
            <button onClick={() => setIsEditing(true)} class="btn btn-warning">Edit</button>
            <button onClick={() => onDelete(job.id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobItem;
