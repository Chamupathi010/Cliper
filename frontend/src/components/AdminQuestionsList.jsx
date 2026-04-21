import React, { useState } from "react";
import toast from "react-hot-toast";
import { deleteQuestion, approveQuestion, rejectQuestion } from "../services/api";

const AdminQuestionsList = ({ questions }) => {
  const [questionsList, setQuestionsList] = useState(questions);
  const [actionLoading, setActionLoading] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    setActionLoading(id);
    try {
      await deleteQuestion(id);
      setQuestionsList((prev) => prev.filter((q) => q._id !== id));
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error("Failed to delete question");
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(`approve-${id}`);
    try {
      await approveQuestion(id);
      setQuestionsList((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status: "approved" } : q))
      );
      toast.success("Question approved");
    } catch (error) {
      toast.error("Failed to approve question");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(`reject-${id}`);
    try {
      await rejectQuestion(id);
      setQuestionsList((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status: "rejected" } : q))
      );
      toast.success("Question rejected");
    } catch (error) {
      toast.error("Failed to reject question");
    } finally {
      setActionLoading(null);
    }
  };

  if (questionsList.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border p-8 text-center">
        <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">
          quiz
        </span>
        <p className="text-slate-500 font-medium">No questions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {questionsList.map((question) => (
        <div
          key={question._id}
          className="bg-white border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            {/* Question Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <a
                  href={`/question/${question._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-slate-900 hover:text-blue-600 truncate"
                >
                  {question.title}
                </a>
                <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                  question.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : question.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {question.status || "pending"}
                </span>
              </div>

              <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                {question.body}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">person</span>
                  {question.authorName || "Anonymous"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  {new Date(question.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">thumb_up</span>
                  {question.upvotes || 0} upvotes
                </span>
              </div>

              {/* Tags */}
              {question.tags && question.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {question.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 min-w-max">
              <button
                onClick={() => handleApprove(question._id)}
                disabled={actionLoading === `approve-${question._id}` || question.status === "approved"}
                className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Approve
              </button>

              <button
                onClick={() => handleReject(question._id)}
                disabled={actionLoading === `reject-${question._id}` || question.status === "rejected"}
                className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">cancel</span>
                Reject
              </button>

              <button
                onClick={() => handleDelete(question._id)}
                disabled={actionLoading === question._id}
                className="flex items-center gap-1 px-3 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Delete
              </button>

              <a
                href={`/question/${question._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                View
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminQuestionsList;
