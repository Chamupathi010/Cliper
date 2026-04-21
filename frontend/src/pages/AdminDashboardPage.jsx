import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AdminTopbar from "../components/AdminTopbar";
import AdminSidebar from "../components/AdminSidebar";
import AdminStats from "../components/AdminStats";
import AdminQuestionsList from "../components/AdminQuestionsList";
import AdminAnswersList from "../components/AdminAnswersList";
import toast from "react-hot-toast";
import { getAdminStats, getAdminQuestions } from "../services/api";

function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"));
  const [stats, setStats] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, questionsRes] = await Promise.all([
        getAdminStats(),
        getAdminQuestions(),
      ]);
      setStats(statsRes.data);
      setQuestions(questionsRes.data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="min-h-screen bg-primary">
      <AdminTopbar />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 lg:ml-64 px-5 pt-20 pb-16 min-h-screen">
          <div className="max-w-[1200px] mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-slate-500">
                Manage content, users, and monitor platform activity
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === "overview" && stats && (
                  <>
                    <AdminStats stats={stats} />
                    <div className="mt-8">
                      <h2 className="text-xl font-bold text-slate-900 mb-4">
                        Recent Questions
                      </h2>
                      <AdminQuestionsList questions={questions.slice(0, 10)} />
                    </div>
                  </>
                )}

                {/* Questions Tab */}
                {activeTab === "questions" && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">
                      All Questions
                    </h2>
                    <AdminQuestionsList questions={questions} />
                  </div>
                )}

                {/* Answers Tab */}
                {activeTab === "answers" && (
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Manage Answers</h2>
                    <p className="text-sm text-slate-500 mb-4">Click "View Answers" on a question to load and manage its answers.</p>
                    <AdminAnswersList questions={questions} />
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">
                      Admin Settings
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            Content Moderation
                          </h3>
                          <p className="text-sm text-slate-500">
                            Enable AI-based content filtering
                          </p>
                        </div>
                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            User Reports
                          </h3>
                          <p className="text-sm text-slate-500">
                            Get notifications for user reports
                          </p>
                        </div>
                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
