// File: src/pages/RegistrationPage.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";
import { mockCreateUser } from "../utils/fakeApi"; // your mock for signup
import Step1 from "../components/Registration/Step1";
import Step2 from "../components/Registration/Step2";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  // Validation for Step 2
  const validateStep2 = () => {
    if (!consent) {
      setError("You must accept the medical statement.");
      return false;
    }
    if (file) {
      const isPdf = file.type === "application/pdf";
      const tooBig = file.size > 5 * 1024 * 1024;
      if (!isPdf) {
        setError("Only PDF files are allowed.");
        return false;
      }
      if (tooBig) {
        setError("File size exceeds 5 MB.");
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

      // 2) Backend call (mock or real)
      // We'll send: { firebase_uid, email, firstName, lastName, province, diseases, file, consent }
      // For now use a fakeApi helper:
      await mockCreateUser({
        firebase_uid: firebaseUid,
        email,
        firstName,
        lastName,
        province,
        diseases,
        file,      // the File object
        consent,
      });

      // REAL backend example (comment out for now):
      // const formData = new FormData();
      // formData.append("firebase_uid", firebaseUid);
      // formData.append("email", email);
      // formData.append("firstName", firstName);
      // formData.append("lastName", lastName);
      // formData.append("province", province);
      // formData.append("diseases", JSON.stringify(diseases));
      // if (file) formData.append("report", file);
      // formData.append("consent", consent);
      // await axios.post("/api/recipients", formData, { headers: { "Content-Type": "multipart/form-data" }});

      // 3) Redirect or show success
      alert("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
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
