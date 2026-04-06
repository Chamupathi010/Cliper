import React, { useState } from "react";
import Sidebar_lec from "../../../components/Sidebar_lec";
import TopBar from "../../../components/TopBar";
import CreateRoomModal from "../../../components/CreateRoomModal";

const rooms = [/* Mock data */
  {
    id: 1,
    title: "Advanced Macroeconomics",
    location: "Auditorium 402",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJfxXCRDlIVn7Q2jpx6WEmc_ThA-EhXVzf5A57Mi4-2vAclsdLpCSfbbBGleO8pD5jV9o4WA9e8LVDjc3eU_hAXl4N02gR_sWWJOmmbhnxHagHGQ7M6KFXZ87Z_4YNftBkHZvezZglDpIMyDxsBX_oxLLrdvmWUA8UOEepLLoQzozxotIPKAOqlIoAqk3a2Aqbspnw6LNm8RZlKlE-cLqyei_kAQn30bmnh2MhHhoJJaaRgpoJ89TR79OioxYd2XHcuEe91q9gqpc",
    status: "live",
    students: "124 Students",
    action: "Enter Room",
  },
  {
    id: 2,
    title: "International Trade",
    location: "Lecture Hall B",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXXJzm8fW8A2W7-9HLoWvW9ufEM0v8AyK77T_xunFnjzXzPBeOUO_U_l83x1OB0YV6aBONOpyCSvJj0fxMo9TvgFUQmdwSfFaD-D7sAeZ-Hx5t2ExEp93Ev7cz1iqjaf_Vf6M7b78ef1yfNQtISTWCQyy74L0hyJ18eF8VdKwP_ExoTT3EcxrbGMgKMX9MRb4gOTHV4TgQ-VJ9CCamz_Fy1bZQwfRxKZeZpAFH1OfZgbcmIl3BZJ0mcdRn4MtPQY0ucibTc0q1LXM",
    status: "scheduled",
    time: "Tomorrow, 10:00 AM",
    students: "86 Enrolled",
    action: "Manage",
  },
  {
    id: 3,
    title: "Econometrics",
    location: "Online Session",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjFKNbweJZW4mhb_lZOxBoiSWwoXxwq8kgfXUXUa0AtH6lbKUMm4RXXH-blg4RNoMuSoSQKVJw6guA0HPe_UNqnfUnQ8PJKpkL9rKbXlqk0iQZUS47NN_GjnyimOmOAc_Dq1dLB4fidbVKAbrBo1qwTF43DQTo4lw6xzh1qpoIptVtC4VlwNOGGfBjw6QtYFcAFLIvE5Rznd-kFz6fTrRDDktatUSHTeN9wrH-w6VJDNBevo7gmpoGJGW1ga5076z79gyzbHd2oWc",
    status: "completed",
    students: "Report Ready",
    action: "View Analytics",
  },
  {
    id: 4,
    title: "Business Statistics",
    location: "Seminar Room 12",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBrz875lqhg7dQ-xJeertWYMzOomzsLQyscBA-wcYXBV8kT_DtE0zkAkADhJBfLeve0CD5wlgRTyqEvVD8uzJWIZa_OhlHLpx3Pn94FKr0aGFN2_iauJeET_KmOS8_x9Qhgeoh5adqSPO20pxlgnlahAhQ0fI552yw8VGsvnCOmoikdsWUE0D6AMKLis-EW5y_o1xCUciQW6LeR9gmvSILJI1T8xH112kOSTfrtsiG-HKDpplm9bj6IPAKeWBYc0KlC2hTomOHzS0",
    status: "scheduled",
    time: "Friday, 2:00 PM",
    students: "45 Enrolled",
    action: "Manage",
  },
];

const LecActiveRooms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] overflow-hidden">
      <Sidebar_lec onCreateRoom={() => setIsModalOpen(true)} />
      <TopBar
        mode="lecturer"
        title="Lecture Rooms"
        subtitle="Manage your active, scheduled, and past lecture sessions"
      />

      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRoomCreated={() => setIsModalOpen(false)}
      />

      <main className="pt-20 md:ml-64 min-h-screen overflow-y-auto px-6 md:px-10 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              My Academic Rooms
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your active, scheduled, and past lecture sessions.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-gray-300 font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                filter_list
              </span>
              <span>Filter</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#0040a1] to-[#0056d2] text-white font-bold text-sm shadow-md flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-sm">
                add_circle
              </span>
              <span>Create New Room</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="flex items-center bg-white px-4 py-3 rounded-2xl border border-gray-200 shadow-sm max-w-md">
            <span className="material-symbols-outlined text-gray-400 text-sm mr-2">
              search
            </span>
            <input
              type="text"
              placeholder="Search rooms..."
              className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`bg-white rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-blue-100/40 transition-all duration-300 flex flex-col border ${
                room.status === "completed"
                  ? "opacity-80 hover:opacity-100 border-gray-100"
                  : "border-transparent hover:border-blue-100"
              }`}
            >
              <div
                className={`h-36 bg-slate-200 relative ${
                  room.status === "completed"
                    ? "grayscale group-hover:grayscale-0"
                    : ""
                }`}
              >
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 left-4">
                  {room.status === "live" && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      Live
                    </span>
                  )}

                  {room.status === "scheduled" && (
                    <span className="bg-[#0056d2] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                      Scheduled
                    </span>
                  )}

                  {room.status === "completed" && (
                    <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                      Completed
                    </span>
                  )}
                </div>

                {room.time && (
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-[#0040a1]">
                    {room.time}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-1">
                  {room.title}
                </h3>

                <p className="text-gray-500 text-sm font-medium flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  {room.location}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="material-symbols-outlined text-lg">
                      {room.status === "completed" ? "analytics" : "group"}
                    </span>
                    <span className="text-sm font-semibold">
                      {room.students}
                    </span>
                  </div>

                  {room.status === "live" && (
                    <button className="bg-gradient-to-br from-[#0040a1] to-[#0056d2] text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all">
                      {room.action}
                    </button>
                  )}

                  {room.status === "scheduled" && (
                    <button className="text-[#0040a1] hover:bg-blue-50 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all">
                      {room.action}
                    </button>
                  )}

                  {room.status === "completed" && (
                    <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all">
                      {room.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add New Room Card */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-300 hover:bg-blue-50/40 transition-all flex flex-col items-center justify-center p-8 min-h-[320px]"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-[#0040a1]">
                add
              </span>
            </div>
            <p className="font-bold text-gray-900">Create New Room</p>
            <p className="text-gray-500 text-sm text-center mt-2 max-w-[180px]">
              Set up a new lecture environment for your students.
            </p>
          </button>
        </div>

        {/* Bottom Insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white/85 backdrop-blur-md p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 border border-white/20 shadow-sm">
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2">Lecturer Insight</h4>
              <p className="text-gray-600 leading-relaxed">
                Your &quot;Advanced Macroeconomics&quot; room has seen a 15%
                increase in student participation compared to last week.
                Consider enabling the &quot;Live Q&amp;A&quot; feature for
                tomorrow&apos;s session.
              </p>
              <button className="mt-6 text-[#0040a1] font-bold text-sm flex items-center gap-2 hover:underline">
                View full engagement report
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </div>

            <div className="w-32 h-32 shrink-0 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
              <div className="text-center">
                <span className="block text-2xl font-black text-[#0040a1]">
                  88%
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">
                  Engagement
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0040a1] to-[#0056d2] p-8 rounded-3xl text-white flex flex-col justify-between relative overflow-hidden">
            <div className="z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                Upcoming Deadlines
              </span>
              <p className="text-2xl font-bold mt-2">Resource Upload</p>
              <p className="text-sm opacity-90 mt-1">
                International Trade Case Studies
              </p>
            </div>

            <div className="z-10 mt-6 flex items-center justify-between">
              <span className="text-xs font-medium">Due in 4 hours</span>
              <span className="material-symbols-outlined text-4xl opacity-30">
                notification_important
              </span>
            </div>

            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md flex justify-around items-center py-3 px-2 z-50 border-t border-gray-200">
        <button className="flex flex-col items-center gap-1 text-gray-500">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold">Dash</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-[#0040a1]">
          <span className="material-symbols-outlined">meeting_room</span>
          <span className="text-[10px] font-bold">Rooms</span>
        </button>

        <button className="w-12 h-12 bg-gradient-to-br from-[#0040a1] to-[#0056d2] rounded-full flex items-center justify-center text-white -mt-8 shadow-lg">
          <span className="material-symbols-outlined">add</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-500">
          <span className="material-symbols-outlined">library_books</span>
          <span className="text-[10px] font-bold">Resources</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-500">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default LecActiveRooms;