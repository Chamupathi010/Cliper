import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminTopbar = () => {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-blue-700 to-blue-800 shadow-lg">
      <nav className="flex justify-between items-center px-6 py-4 max-w-full mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-lg p-2">
            <span className="material-symbols-outlined text-white">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-blue-100">Academic Atelier</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Admin Info */}
          <div className="hidden md:flex flex-col items-end">
            <p className="text-sm font-medium text-white">{adminUser.email || "Admin"}</p>
            <p className="text-xs text-blue-100">Administrator</p>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-white/20"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default AdminTopbar;
