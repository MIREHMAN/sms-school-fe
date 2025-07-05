import React, { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { useAsyncFn } from "@/hooks/useAsync";
import { AuthService } from "@/services/authService";
import { useUser } from "@/context/UserContext";
import RoleBasedRedirect from "@/components/RoleBasedRedirect";

const LoginPage = () => {
  const { login, user } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    loading: loginLoading,
    error: loginError,
    execute: loginExecute,
  } = useAsyncFn((username, password) =>
    AuthService.login(username, password)
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginExecute(username, password);
      if (response?.user && response?.tokens) {
        login(response);
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Login failed:", err?.response?.data || err.message);
    }
  };

  if (isSuccess && user?.role) {
    return <RoleBasedRedirect />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">School Portal</h1>
          <p className="text-gray-500">Login to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all"
              required
            />
          </div>

          {loginError && (
            <p className="text-sm text-red-500 mb-4">
              {loginError?.response?.data?.message || "Login failed"}
            </p>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center transition-all ${
              loginLoading
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {loginLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          <span>Secure school portal access</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
