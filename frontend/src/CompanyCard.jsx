import React from "react";

function CompanyCard({ company }) {
  return (
    <div className="company-card">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
    </div>
  );
}

export default CompanyCard;
