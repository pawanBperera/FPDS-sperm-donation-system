// File: src/pages/RegistrationPage.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
//import axios from "axios";
//import { mockCreateUser } from "../utils/fakeApi"; // your mock for signup
import Step1 from "../components/Registration/Step1";
import Step2 from "../components/Registration/Step2";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosInstance";

import { toast } from "react-toastify";



export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  //const [step, setStep] = useState(1);

  // --- Step 1 state ---
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [province, setProvince] = useState("");

  // --- Step 2 state ---
  const [diseases, setDiseases] = useState([]); // array of disease IDs or keys
  const [file, setFile] = useState(null);
  const [consent, setConsent] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation for Step 1
  const validateStep1 = () => {
     if (!email || !firstName || !lastName || !password || !confirmPassword || !province) {
    toast.error("All fields are required.");
    return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
    toast.error("Invalid email address.");
    return false;
    }
    if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
    }
    setError("");
    return true;
  };

  // Validation for Step 2
  const validateStep2 = () => {
    if (!consent) {
    toast.error("You must accept the medical statement.");
    return false;
    }
     if (file) {
    const isPdf = file.type === "application/pdf";
    const tooBig = file.size > 5 * 1024 * 1024;

    if (!isPdf) {
      toast.error("Only PDF files are allowed.");
      return false;
    }

    if (tooBig) {
      toast.error("File size exceeds 5 MB.");
      return false;
    }
  }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) setCurrentStep(2);
  };

  const handleRegister = async () => {
    if (!validateStep2()) return;
    setLoading(true);


    try {
      // 1) Firebase signup
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUid = cred.user.uid;
      const token = await cred.user.getIdToken();


 // 2. Backend user creation with auth header
  const response =// await api.post("/api/users", 
  await api.post("/users", {
    firebaseUid,
    email,
    username: email.split("@")[0],
    roleId: 1
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

/*await api.post("/api/users", {
  firebaseUid: cred.user.uid,
  email: email,
  username: email.split("@")[0],
  roleId: 1
});*/

const createdUser = response.data;
const userId = createdUser.id;

const profilePayload = {
  firstName,    // from Step 1 state
  lastName,     // from Step 1 state
  province,     // from Step 1 state
  diseases,     // from Step 2 state (array)
  consent       // from Step 2 state (boolean)
};

//await api.post(`/api/recipients/${userId}/profile`);

await api.post(`/recipients/${userId}/profile`, profilePayload);


// 3. Handle response
  if (response.status === 201 || response.status === 200) {
    alert("Account created! Please log in.");
    navigate("/login");
  } else {
    setError("Registration failed. Please try again.");
    console.error("Unexpected status code:", response.status);
  }

} catch (err) {
  console.error("Registration error:", err);
  setError("Registration failed. Try again.");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="registration-page">
      {currentStep === 1 && (
        <Step1
          email={email} setEmail={setEmail}
          firstName={firstName} setFirstName={setFirstName}
          lastName={lastName} setLastName={setLastName}
          password={password} setPassword={setPassword}
          confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
          province={province} setProvince={setProvince}
          onNext={handleNext}
        />
      )}

      {currentStep === 2 && (
        <Step2
          diseases={diseases} setDiseases={setDiseases}
          file={file} setFile={setFile}
          consent={consent} setConsent={setConsent}
          onBack={() => setCurrentStep(1)}
          onRegister={handleRegister}
          loading={loading}
        />
      )}

      {error && <p className="error-text">{error}</p>}
    </div>

    
  );
}
