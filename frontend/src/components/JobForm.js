import React, { useState } from 'react';

const JobForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    company: '',
    position: '',
    applied_date: '',
    job_post_link: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const year = new Date(form.applied_date).getFullYear();
    const currentYear = new Date().getFullYear();
  
    if (year < 1000 || year > currentYear) {
      alert(`Year must be between 1000 and ${currentYear}`);
      return;
    }
  
    await onAdd(form);
    setForm({
      company: '',
      position: '',
      applied_date: '',
      job_post_link: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="row">

            <div className="col-md-3">
            <label className="form-label">Company:</label>
            <input
                type="text"
                className="form-control center-placeholder"
                name="company"
                placeholder="Enter Company"
                value={form.company}
                onChange={handleChange}
                required
            />
            </div>

            <div className="col-md-3">
            <label className="form-label">Position:</label>
            <input
                type="text"
                className="form-control center-placeholder"
                name="position"
                placeholder="Enter Position"
                value={form.position}
                onChange={handleChange}
                required
            />
            </div>

            <div className="col-md-3">
            <label className="form-label">Applied Date:</label>
            <input
                type="date"
                className="form-control"
                name="applied_date"
                value={form.applied_date}
                onChange={handleChange}
                style={{ textAlign: 'center', textAlignLast: 'center' }}
                required
            />
            </div>

            <div className="col-md-3">
            <label className="form-label">Job Post Link:</label>
            <input
                type="url"
                className="form-control center-placeholder"
                name="job_post_link"
                placeholder="Link (optional)"
                value={form.job_post_link}
                onChange={handleChange}
            />
            </div>
            
        </div>

        <div className="mt-3  mb-4">
            <button className="btn btn-primary" type="submit">
            Add Job
            </button>
        </div>
    </form>

  );
};

export default JobForm;
