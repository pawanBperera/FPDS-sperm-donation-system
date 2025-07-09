// File: src/pages/SearchResultsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getDonors } from "../services/donorApi";             // ADDED
import DonorProfileCard from "../components/DonorProfileCard";  // ADDED
import "./SearchResultsPage.css";

export default function SearchResultsPage() {
  const { search } = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // parse query params (unchanged)
  const params = new URLSearchParams(search);
  const criteria = Object.fromEntries(params.entries());

  useEffect(() => {
    async function fetchResults() {
      try {
        setLoading(true);  // UPDATED: show loading during API call
        const res = await getDonors();    // UPDATED: use donorApi instead of mockSearchDonors
        setResults(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [search]);

  if (loading) return <p>Loading results…</p>;
  if (results.length === 0) return (
    <p>No exact matches. See <Link to="/recipient/search">fallback suggestions</Link>.</p>
  );

  return (
    <div className="results-page">
      <h1>Search Results</h1>
      <div className="results-grid">  {/* ADDED: container for profile cards */}
        {results.map((donor) => (
          <DonorProfileCard key={donor.userId} donor={donor} />  
        ))}
      </div>
      {/* pagination controls here (unchanged) */}
    </div>
  );
}
