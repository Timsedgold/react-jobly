import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function JobsList({ applyToJob, currentUser }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);

  return (
    <div>
      <h2>Jobs</h2>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          applyToJob={applyToJob}
          hasApplied={currentUser?.applications?.includes(job.id)}
        />
      ))}
    </div>
  );
}

export default JobsList;
