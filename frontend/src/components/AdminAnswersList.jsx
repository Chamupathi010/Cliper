import React, { useState } from "react";
import toast from "react-hot-toast";
import { getAdminAnswers, deleteAdminAnswer } from "../services/api";

const AdminAnswersList = ({ questions }) => {
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const loadAnswers = async (questionId) => {
    if (openQuestionId === questionId) {
      // toggle close
      setOpenQuestionId(null);
      return;
    }

    try {
      setLoadingId(questionId);
      const { data } = await getAdminAnswers(questionId);
      setAnswers((prev) => ({ ...prev, [questionId]: data }));
      setOpenQuestionId(questionId);
    } catch (error) {
      toast.error("Failed to load answers");
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteAnswer = async (answerId, questionId) => {
    if (!window.confirm("Delete this answer permanently?")) return;
    try {
      await deleteAdminAnswer(answerId);
      setAnswers((prev) => ({
        ...prev,
        [questionId]: prev[questionId].filter((a) => a._id !== answerId),
      }));
      toast.success("Answer deleted");
    } catch (error) {
      toast.error("Failed to delete answer");
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border p-8 text-center">
        <p className="text-slate-500 font-medium">No questions available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <div key={q._id} className="bg-white border border-border rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <a href={`/question/${q._id}`} target="_blank" rel="noreferrer" className="text-lg font-semibold text-slate-900 hover:text-blue-600">
                {q.title}
              </a>
              <p className="text-sm text-slate-500 mt-2 truncate">{q.body}</p>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => loadAnswers(q._id)}
                className="btn btn-secondary text-sm"
              >
                {loadingId === q._id ? "Loading..." : openQuestionId === q._id ? "Hide Answers" : "View Answers"}
              </button>
            </div>
          </div>

          {openQuestionId === q._id && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              {answers[q._id] && answers[q._id].length > 0 ? (
                <div className="space-y-3">
                  {answers[q._id].map((a) => (
                    <div key={a._id} className="flex items-start justify-between gap-4 p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-slate-800">{a.body}</p>
                        <div className="text-xs text-slate-500 mt-2 flex gap-3">
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span>{a.authorName || 'Anonymous'}</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span>{new Date(a.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">thumb_up</span>{a.upvotes || 0}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 min-w-max">
                        <button onClick={() => handleDeleteAnswer(a._id, q._id)} className="flex items-center gap-1 px-3 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-medium"> 
                          <span className="material-symbols-outlined text-sm">delete</span>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-sm text-slate-500">No answers for this question.</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminAnswersList;
