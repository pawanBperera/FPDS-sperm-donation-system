
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
//import "./AdminAllDonors.css"; // optional styling file if needed
import axios from "axios";





// ─── Axios defaults ────────────────────────────────────────────
axios.defaults.baseURL = "http://localhost:8080";
const stored = localStorage.getItem("user");
if (stored) {
const { token } = JSON.parse(stored);
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
// ─────────────────────────────────────────────────────────────────




export default function AdminAllDonors() {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);

  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchDonors = async () => {
    try {
      const res = await axios.get("/api/admin/users/donors"); 
      setDonors(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
    }finally {
      setLoading(false);
    }
  };

  fetchDonors();
}, []);




  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };



  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this donor?")) {
      setDonors((prev) => prev.filter((d) => d.id !== id));
    }
  };



  return (
    <div className="donor-page-container">
      <h2 className="text-center my-4 fw-bold">All Donors</h2>

   {loading ? (
      <p className="text-center">Loading donors...</p>
    ) : (
      <>



       <div className="text-center mt-4">
              <button className="btn" style={{ backgroundColor: "#f79bd3" }} onClick={() => navigate("/admin/dashboard")}> 
                <FaHome className="me-2" /> Dashboard
              </button>
            </div> <br></br>

      <div className="table-responsive d-flex justify-content-center">
        <table className="table table-bordered text-center" style={{ maxWidth: "800px", backgroundColor: "#fce6ff" }}>
          <thead>
            <tr>
              <th>Donor ID</th>
              <th>Email</th>
              <th>Age</th>
              <th>Shortlisted Count</th>
              <th></th>
            </tr>
          </thead>



          <tbody>
           {donors.map((d, index) => (
    <tr key={`${d.userId}-${index}`}>
      <td>{d.userId}</td>
      <td>{d.email}</td>
      <td>{d.age > 0 ? d.age : "N/A"}</td>
      <td>{d.shortlistedCount}</td>
      <td>


                 <button
          className="btn btn-danger"
          onClick={() => handleRemove(d.userId)}
        >
          Remove The Donor
        </button>
                </td>


              </tr>
            ))}
            {donors.length === 0 && (
              <tr>
                <td colSpan="5">No donors available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    

</>
  )}
    </div>
  );
}
