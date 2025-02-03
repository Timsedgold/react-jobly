import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";

function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getCompanies() {
      try {
        const res = await JoblyApi.getCompanies(searchTerm);
        setCompanies(res);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }
    getCompanies();
  }, [searchTerm]); // Re-fetch companies when searchTerm changes

  return (
    <div className="container">
      <h1>Companies</h1>
      <input
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {companies.length ? (
          companies.map((c) => (
            <Link to={`/companies/${c.handle}`} key={c.handle}>
              <CompanyCard company={c} />
            </Link>
          ))
        ) : (
          <p>No companies found.</p>
        )}
      </div>
    </div>
  );
}

export default CompaniesList;
