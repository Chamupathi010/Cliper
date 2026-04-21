import React from "react";

const AdminStats = ({ stats }) => {
  const statCards = [
    {
      label: "Total Questions",
      value: stats?.totalQuestions || 0,
      icon: "quiz",
      color: "blue",
    },
    {
      label: "Total Answers",
      value: stats?.totalAnswers || 0,
      icon: "question_answer",
      color: "green",
    },
    {
      label: "Active Users",
      value: stats?.activeUsers || 0,
      icon: "people",
      color: "purple",
    },
    {
      label: "Flagged Content",
      value: stats?.flaggedContent || 0,
      icon: "flag",
      color: "red",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };

  const iconBgClasses = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    red: "bg-red-100",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, idx) => (
        <div
          key={idx}
          className={`rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 ${colorClasses[card.color]}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium opacity-75">{card.label}</p>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
            <div className={`${iconBgClasses[card.color]} p-3 rounded-lg`}>
              <span className="material-symbols-outlined text-2xl">{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
