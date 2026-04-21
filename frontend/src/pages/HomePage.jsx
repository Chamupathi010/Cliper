import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiPlusCircle, FiTrendingUp, FiClock } from "react-icons/fi";
import { getQuestions, upvoteQuestion, downvoteQuestion } from "../services/api";
import QuestionCard from "../components/QuestionCard";
import toast from "react-hot-toast";

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data } = await getQuestions(search, sort);
      setQuestions(data);
    } catch {
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [sort]);

  // Read `sort` from query param when page loads or when URL changes
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSort = params.get("sort");
    if (urlSort && urlSort !== sort) {
      setSort(urlSort);
    }
    // if no sort param and current sort isn't newest, reset to newest
    if (!urlSort && sort !== "newest") {
      setSort("newest");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchQuestions();
  };

  const handleUpvote = async (id) => {
    try {
      const { data } = await upvoteQuestion(id);
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? data : q))
      );
    } catch {
      toast.error("Vote failed");
    }
  };

  const handleDownvote = async (id) => {
    try {
      const { data } = await downvoteQuestion(id);
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? data : q))
      );
    } catch {
      toast.error("Vote failed");
    }
  };

  return (
    <div className="animate-fadeInUp space-y-6" id="home-page">
      {/* Top Bar Card */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-100 flex-shrink-0">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <form className="flex-1 relative" onSubmit={handleSearch}>
          <input
            type="text"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all text-text-main placeholder-text-muted"
            placeholder="Create a post..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <Link to="/ask" className="btn btn-primary px-6 py-3 rounded-xl font-bold" id="create-post-btn">
          Create Post
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "newest", label: "Newest" },
          { id: "popular", label: "Top Rated" },
          { id: "following", label: "Following" },
          { id: "academic", label: "Academic Peer Review" },
        ].map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                sort === tab.id
                  ? "bg-indigo-100 text-indigo-700 shadow-sm"
                  : "text-text-muted hover:text-text-main hover:bg-slate-100"
              }`}
              onClick={() => {
                // update sort state and URL query param so sidebar link works
                setSearch("");
                setSort(tab.id);
                const params = new URLSearchParams(location.search);
                if (tab.id === "newest") {
                  params.delete("sort");
                } else {
                  params.set("sort", tab.id);
                }
                navigate({ pathname: "/", search: params.toString() }, { replace: true });
              }}
            >
              {tab.label}
            </button>
        ))}
      </div>

      {/* Questions Feed */}
      <div className="grid gap-4" id="questions-feed">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-12 text-text-muted">
            <div className="spinner"></div>
            <p className="text-sm font-medium">Loading questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-border shadow-sm">
            <FiSearch className="text-5xl mx-auto mb-4 text-slate-200" />
            <h3 className="text-xl font-bold text-text-main mb-2">No questions yet</h3>
            <p className="text-text-muted mb-6">Be the first to ask a question!</p>
            <Link to="/ask" className="btn btn-primary px-8 py-3">
              Ask a Question
            </Link>
          </div>
        ) : (
          questions.map((q) => (
            <QuestionCard
              key={q._id}
              question={q}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
              showVotes={sort !== "popular"}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
