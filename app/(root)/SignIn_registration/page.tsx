"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./login.module.css"; // Your CSS module

const organizationImages: Record<string, string> = {
  "Erindale Health center": "/images/Erindale.jpg",
  "Parkville Manor": "/images/Parkville.jpg",
  "Kenderdine Medical Clinic": "/images/Kenderdine.jpg",
  "Jim Pattison Children's Hospital": "/images/JimPattison.jpg",
  "Evergreen Medical Clinic": "/images/Evergreen.jpg",
};

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orgName = searchParams.get("organization") || "";

  const [isRegistering, setIsRegistering] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (orgName && organizationImages[orgName]) {
      setImageSrc(organizationImages[orgName]);
      setImageError(false);
    } else {
      setImageSrc("");
      setImageError(false);
    }
  }, [orgName]);

  const handleImageError = () => {
    setImageError(true);
  };

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

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add password validation
    if (password !== ConfirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return;
    }

    // Clear any previous error messages
    setErrorMsg("");

    // Add your registration logic here
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          staff_Id: staffId, 
          password, 
          organization: orgName 
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Handle successful registration
        alert("Registration successful! Please check your email for confirmation.");
        setIsRegistering(false); // Switch back to login
      } else {
        setErrorMsg(data.message || "Registration failed");
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <div className={styles["page-wrapper"]}>
      <div className={`${styles.container} ${isRegistering ? styles.active : ""}`}>

        {/* Sign In Panel */}
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
                className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                onClick={() => setShowPassword((prev) => !prev)}
                role="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              ></i>
            </div>
            <a href="https://www.w3schools.com/html/html_links.asp"> Forgot password</a>
            <button type="submit">Sign In</button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.replace("/");
              }}
            >
              ← Select Organization
            </a>
          </form>
        </div>

        {/* Registration Panel */}
        <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
          <h2>Registration</h2>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          
          {/* Organization display with improved styling */}
        

          <form onSubmit={handleRegistration}>
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
                minLength={6}
              />
              <i
                className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                onClick={() => setShowPassword((prev) => !prev)}
                role="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              ></i>
            </div>
            <div className={styles["password-container"]}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              <i
                className={`bi ${showConfirmPassword ? "bi-eye" : "bi-eye-slash"}`}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                role="button"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              ></i>
            </div>

            <button type="submit">Register</button>
            <p>
              <a
                href="https://calendly.com/mobilecharterorg/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Need help? Schedule a call
              </a>
            </p>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className={styles["toggle-container"]}>
          <div className={styles.toggle}>
            <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
              <h2>Welcome Back!</h2>
              <p>To stay connected, please sign in</p>
              <button
                className={styles.hidden}
                onClick={() => setIsRegistering(false)}
              >
                Sign In
              </button>
            </div>
            <div className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}>

              <div className={styles["org-display"]}>
          
            {/* Enhanced image display with better error handling */}
            {imageSrc && !imageError ? (
              <div className={styles["image-placeholder"]}>
                <img
                  src={imageSrc}
                  alt={`${orgName} logo`}
                  className={styles["placeholder-image"]}
                  onError={handleImageError}
                  onLoad={() => setImageError(false)}
                />
              </div>
            ) : orgName && organizationImages[orgName] ? (
              <div className={styles["image-placeholder"]}>
                <div className={styles["image-error"]}>
                  <p>📷 Logo unavailable</p>
                </div>
              </div>
            ) : (
              <div className={styles["image-placeholder"]}>
                <div className={styles["no-image"]}>
                  <p>🏢 {orgName}</p>
                </div>
              </div>
            )}
          </div>
              <button
                className={styles.hidden}
                onClick={() => setIsRegistering(true)}
              >
                Sign in with Room ID
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
