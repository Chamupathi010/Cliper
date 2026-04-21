import React from "react";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { name: "Dashboard Overview", icon: "dashboard", id: "overview" },
    { name: "Manage Questions", icon: "quiz", id: "questions" },
    { name: "Manage Answers", icon: "question_answer", id: "answers" },
    { name: "Content Moderation", icon: "shield", id: "moderation" },
    { name: "User Management", icon: "people", id: "users" },
  ];

  const bottomItems = [
    { name: "Settings", icon: "settings", id: "settings" },
    { name: "Help & Docs", icon: "help_outline", id: "help" },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 pt-24 flex flex-col gap-2 p-4 border-r border-slate-200 bg-white hidden lg:flex shadow-sm">
      {/* Navigation Section */}
      <div className="px-4 py-3 mb-2">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          Management
        </h3>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 hover:translate-x-1 text-left ${
              activeTab === item.id
                ? "bg-blue-50 border-l-4 border-blue-600 text-blue-700 font-bold"
                : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"
            }`}
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-auto border-t border-slate-200 pt-4 space-y-1">
        <div className="px-4 py-2 mb-2">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
            Other
          </h3>
        </div>
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg transition-all duration-200 hover:translate-x-1 text-left ${
              activeTab === item.id ? "bg-slate-100 text-slate-900 font-semibold" : ""
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;
