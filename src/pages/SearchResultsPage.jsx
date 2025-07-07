// File: src/pages/SearchResultsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { mockSearchDonors } from "../utils/fakeApi"; // you’ll create this
import "./SearchResultsPage.css";

export default function SearchResultsPage() {
  const { search } = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // parse query params
  const params = new URLSearchParams(search);
  const criteria = Object.fromEntries(params.entries());

  useEffect(() => {
    async function fetchResults() {
      try {
        const data = await mockSearchDonors(criteria);
        setResults(data);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [search]);

  if (loading) return <p>Loading results…</p>;
  if (results.length === 0) return <p>No exact matches. See <Link to="/recipient/search">fallback suggestions</Link>.</p>;

  return (
    <div className="results-page">
      <h1>Search Results</h1>
      {results.map((d) => (
        <div key={d.id} className="donor-card">
          {/* reuse your card UI */}
          <div className="card-header">
            <span>{d.id}</span>
            <span>{d.ethnicity}, from {d.city}</span>
          </div>
          <div className="card-body">
            <p>Age: {d.age}</p>
            <p>Location: {d.city}, {d.district}</p>
            <p>Date registered: {d.registeredAt}</p>
          </div>
          <Link to={`/recipient/donor/${d.id}`} className="btn btn-profile">
            Profile
          </Link>
        </div>
      ))}
      {/* pagination controls here */}
    </div>
  );
}