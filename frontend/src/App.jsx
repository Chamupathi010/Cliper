import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ForumTopbar from "./components/Navbar";
import ForumSidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import AskQuestionPage from "./pages/AskQuestionPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
          },
        }}
      />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* Forum Routes */}
        <Route
          path="/*"
          element={
            <>
              <ForumTopbar />
              <div className="flex">
                <ForumSidebar />
                <main className="flex-1 lg:ml-64 px-5 pt-20 pb-16 min-h-screen">
                  <div className="max-w-[1000px] mx-auto">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/ask" element={<AskQuestionPage />} />
                      <Route path="/question/:id" element={<QuestionDetailPage />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
