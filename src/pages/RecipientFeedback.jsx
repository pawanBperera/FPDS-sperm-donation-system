// File: src/pages/RecipientFeedback.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { RecipientSidebar } from "../components/Sidebars/RecipientSidebar";
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
//import "./RecipientFeedback.css"; // optional styling

export default function RecipientFeedback() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = () => {
    navigate("/recipient/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!message.trim()) {
      return setError("Please enter your feedback before sending.");
    }
    setLoading(true);
    try {
      //  Grab Firebase ID token for authorization
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("You must be logged in to send feedback.");
      const token = await currentUser.getIdToken();
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.post("http://localhost:8080/api/feedback",
        {
          user_id: user.id,
          subject: "what",        // optional
          message,
          rating: null,         // optional rating
        },
        config
      );

      alert("Thank you for your feedback!");
      navigate("/recipient/dashboard");
    } catch (err) {
      console.error("Feedback error:", err);
      setError(err.message || "Failed to send feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="d-flex vh-100">
        <RecipientSidebar />
        <main className="flex-grow-1 p-4">
          <h1>We Value Your Feedback!</h1>
          <p>Tell us how we can improve</p>

          <form onSubmit={handleSubmit}>
            {error && <p className="text-danger">{error}</p>}

            <div className="mb-4">
              <textarea
                className="form-control"
                rows={8}
                placeholder="Write your feedback here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send Feedback"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
