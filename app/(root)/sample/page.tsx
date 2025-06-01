"use client";
import React, { useState } from "react";

export default function TestPassword() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        style={{ paddingRight: "30px", width: "100%" }}
      />
      <i
        className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`}
        style={{ position: "absolute", right: 10, top: 10, cursor: "pointer", fontSize: "20px" }}
        onClick={() => setShow(!show)}
      ></i>
    </div>
  );
}
