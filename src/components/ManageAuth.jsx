import React, { useState } from "react";
import { useAsyncFn } from "@/hooks/useAsync";
import { AuthService } from "@/services/authService";

const roles = ["student", "teacher", "parent"];
const genders = ["male", "female", "other"];

const ManageAuth = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "student",
    name: "",
    gender: "male",
  });

  const {
    loading: loginLoading,
    error: loginError,
    execute: loginExecute,
  } = useAsyncFn((username, password) =>
    AuthService.login(username, password)
  );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const { username, password } = formData;
      if (!username || !password) return;

      console.log("Logging in with:", username, password);
      const response = await loginExecute(username, password);
      console.log(response);
      // const tokens = response?.tokens;

      if (response) {
        localStorage.setItem("SchoolAuthData", JSON.stringify(response));
      }

      console.log("Login success!");
      onClose?.();
    } catch (err) {
      console.error("Login failed:", err?.response?.data || err.message);
    }
  };

  const handleSignUpStep1 = () => {
    if (!formData.username || !formData.password || !formData.role) return;
    setStep(2);
  };

  const handleSignUpStep2 = () => {
    console.log("Sign up complete with:", formData);
    onClose?.();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      {/* Tabs */}
      <div className="flex justify-around mb-6">
        <button
          className={`w-1/2 py-2 rounded-l-md text-sm font-medium ${
            activeTab === "login"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("login");
            setStep(1);
          }}
        >
          Login
        </button>
        <button
          className={`w-1/2 py-2 rounded-r-md text-sm font-medium ${
            activeTab === "signup"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => {
            setActiveTab("signup");
            setStep(1);
          }}
        >
          Sign Up
        </button>
      </div>

      {/* Content */}
      {activeTab === "login" ? (
        <>
          <h2 className="text-lg font-semibold mb-4">Login to your account</h2>
          <input
            name="username"
            placeholder="Username"
            className="input-style"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-style"
            value={formData.password}
            onChange={handleChange}
          />
          {loginError && (
            <p className="text-red-500 text-sm">
              {loginError.response?.data?.message || "Login failed."}
            </p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white py-2 mt-4 rounded hover:bg-purple-700"
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">
            {step === 1 ? "Create your account" : "Tell us more about you"}
          </h2>

          {step === 1 ? (
            <>
              <input
                name="username"
                placeholder="Choose a Username"
                className="input-style"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Create a Password"
                className="input-style"
                value={formData.password}
                onChange={handleChange}
              />
              <select
                name="role"
                className="input-style"
                value={formData.role}
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSignUpStep1}
                className="w-full bg-purple-600 text-white py-2 mt-4 rounded hover:bg-purple-700"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <input
                name="name"
                placeholder="Your Full Name"
                className="input-style"
                value={formData.name}
                onChange={handleChange}
              />
              <select
                name="gender"
                className="input-style"
                value={formData.gender}
                onChange={handleChange}
              >
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSignUpStep2}
                className="w-full bg-purple-600 text-white py-2 mt-4 rounded hover:bg-purple-700"
              >
                Sign Up
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ManageAuth;
