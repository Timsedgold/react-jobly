import React from "react";

function JobCard({ job, applyToJob, hasApplied }) {
  function handleApply() {
    if (!hasApplied) {
      applyToJob(job.id);
    }
  }

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>Salary: {job.salary ? `$${job.salary}` : "N/A"}</p>
      <p>Equity: {job.equity ? job.equity : "N/A"}</p>
      <button onClick={handleApply} disabled={hasApplied}>
        {hasApplied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
