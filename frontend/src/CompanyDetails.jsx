import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function CompanyDetail({ applyToJob, currentUser }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      let company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    getCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      {company.jobs.map((job) => (
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

export default CompanyDetail;
