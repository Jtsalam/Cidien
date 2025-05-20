"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css"; // Create a CSS module from your styles

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ staff_Id: staffId, password }),
    });

    const data = await res.json();
    if (res.ok) {
      const role = data.user_role;
      if (role === "Staff") router.push("/StaffDashboard/userdashboard");
      else if (role === "Admin") router.push("/AdminDashboard/userdashboard");
      else if (role === "IT") router.push("/ITDashboard/userdashboard");
    } else {
      setErrorMsg(data.message || "Invalid credentials");
    }
  };

  const unsetSession = async () => {
    await fetch("/api/unset-session", { method: "GET" });
    router.push("/UserLogin/sign-in-form");
  };

  return (
    <div className={`${styles.container} ${isRegistering ? styles.active : ""}`}>
      <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
        <form onSubmit={handleLogin}>
          <h2>Sign In</h2>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <input
            type="text"
            placeholder="Staff ID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            required
          />
          <div className={styles["password-container"]}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
        <form>
          <h2>Register</h2>
          <p>Registration logic goes here</p>
          <button type="button">Register</button>
        </form>
      </div>

      <div className={styles["toggle-container"]}>
        <div className={styles.toggle}>
          <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
            <h2>Welcome Back!</h2>
            <p>To stay connected, please sign in</p>
            <button className={styles.hidden} onClick={() => setIsRegistering(false)}>
              Sign In
            </button>
            <a onClick={unsetSession}>Select Organization</a>
          </div>
          <div className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}>
            <h2>Hello!</h2>
            <p>Enter your details to register</p>
            <button className={styles.hidden} onClick={() => setIsRegistering(true)}>
              Register
            </button>
            <a onClick={unsetSession}>My Organization</a>
          </div>
        </div>
      </div>
    </div>
  );
}
