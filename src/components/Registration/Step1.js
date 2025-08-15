
import React from "react";
import { provincesList } from "../../constants"; 
import "./Step1.css";



export default function Step1({
  email, setEmail,
  firstName, setFirstName,
  lastName, setLastName,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  province, setProvince,
  onNext
}) 



{
  return (


    <div className="step1-form">
      <h2>Step 1: Account Info</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />


      <br></br>


      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />


      <br></br>


      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />


      <br></br>


      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />


      <br></br>


      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />

      <br></br>



      <select
  value={province}
  onChange={e => setProvince(e.target.value)}
>
  <option value="">Select Province</option>
  {provincesList.map(p => (
    <option key={p} value={p}>{p}</option>
  ))}
</select>




      <button onClick={onNext}>Next</button>
      <p>
        Have an account? <a href="/login">Log in</a>
      </p>


      
    </div>
  );
}
