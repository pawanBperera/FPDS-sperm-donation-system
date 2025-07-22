// File: src/pages/DonorDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { DonorSidebar } from "../components/Sidebars/DonorSidebar";
import { FaHeart, FaBell } from "react-icons/fa";
import "./DonorDashboard.css"; // or whatever filename you saved the above CSS in

export default function DonorDashboard() {
  const navigate = useNavigate();
  //const user = JSON.parse(localStorage.getItem("user")) || {};

  // 1) Dynamic timestamps
  const [lastLogin, setLastLogin]       = useState("");
  const [lastPwdChange, setLastPwdChange] = useState("");

  useEffect(() => {
    const u = auth.currentUser;
    if (u) {
      // last login
      const lastSignIn = u.metadata.lastSignInTime;
      setLastLogin(new Date(lastSignIn).toLocaleString());

      // ***** TEMP HACK *****  
      // use account creation as proxy for password‐change date
      const created = u.metadata.creationTime;
      const daysAgo  = Math.floor(
        (Date.now() - new Date(created).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setLastPwdChange(`${daysAgo}d ago`);
      // *************************
    }
  }, []);

  // 2) Static notifications for now
  const notifications = [
    {
      id: 1,
      icon: <FaHeart className="text-success me-2" />,
      text: "A recipient match with your donation has been approved by the clinic",
      date: "April 28",
    },
    {
      id: 2,
      icon: <FaHeart className="text-primary me-2" />,
      text: "Your donation was shortlisted by a recipient.",
      date: "April 28",
    },
    {
      id: 3,
      icon: <FaHeart className="text-primary me-2" />,
      text: "Your donation was shortlisted by a recipient.",
      date: "April 26",
    },
    {
      id: 4,
      icon: <FaBell className="me-2" />,
      text: "New health screening update completed.",
      date: "April 20",
    },
    {
      id: 5,
      icon: <FaBell className="me-2" />,
      text: "No new matches at this time.",
      date: "April 15",
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    
<>
 {/* Sidebar */}
      <DonorSidebar />

     <div
  className="donor-page"
  style={{ marginLeft: "240px", minHeight: "100vh" }}
>
     

      {/* Main */}
      <div className="flex-grow-1 p-4 d-flex flex-column">

        
        <header className="mb-4">
          <h1 className="mb-1">Welcome back, 👋</h1>


          <p className="text-secondary">
            Your donor profile will connect you with couples and singles that
            wish to be parents and seek the need of =======.
          </p>
        </header>

        {/* Dynamic login/password info */}
        <div
          className="bg-light p-3 rounded mb-4"
          style={{ maxWidth: "400px" }}
        >
          <p className="mb-1">
            <FaBell className="me-2 text-warning" />
            Last login: <strong>{lastLogin}</strong>
          </p>
          <p className="mb-0">
            <FaBell className="me-2 text-warning" />
            Last Password Change: <strong>{lastPwdChange}</strong>
          </p>
        </div>

        {/* Notifications */}
        <div className="flex-grow-1 overflow-auto">
          {notifications.map(({ id, icon, text, date }) => (
            <div
              key={id}
              className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
            >
              <div className="d-flex align-items-center">
                {icon}
                <span>{text}</span>
              </div>
              <small className="text-muted">({date})</small>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-3">
          <button
            className="btn btn-danger"
            style={{ width: "200px" }}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>


      </div>


    </div>

    </>
  );
}