import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { adminLogin } from "../services/api";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await adminLogin({ email, password });
      
      // Store admin token
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      
      toast.success("Admin login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Sign in to Academic Atelier</h1>
            <p className="text-slate-500 text-sm">
              Access the logins and manage the platform effectively
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary mt-2 justify-center"
            >
              {loading ? (
                <span className="spinner" style={{ width: "18px", height: "18px" }}></span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">login</span>
                  Sign In
                </>
              )}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary mt-2 justify-center"
            >
              {loading ? (
                <span className="spinner" style={{ width: "18px", height: "18px" }}></span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">login</span>
                  Sign Up
                </>
              )}
            </button>
          </form>

         

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors underline"
            >
              ← Back to Forum
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>© 2026 Academic Atelier </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
