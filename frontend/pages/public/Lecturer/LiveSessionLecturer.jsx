import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LecturerSidebar from "../../../components/Sidebar_lec";
import TopBar from "../../../components/TopBar";
import CreateRoomModal from "../../../components/CreateRoomModal";

const POLL_INTERVAL = 5000; // poll messages every 5 s
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LiveSessionLecturer = () => {
  const navigate = useNavigate();

  // ── room state ─────────────────────────────────────────────────────────────
  const [room, setRoom]           = useState(null);   // active room object
  const [roomLoading, setRoomLoading] = useState(true);
  const [roomError, setRoomError] = useState("");

  // ── chat state ─────────────────────────────────────────────────────────────
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [sending, setSending]     = useState(false);
  const [clearing, setClearing]   = useState(false);

  // ── modal state (create room) ──────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chatBottomRef = useRef(null);
  const pollRef       = useRef(null);

  const token = localStorage.getItem("token");

  // ── fetch lecturer's active room ───────────────────────────────────────────
  const fetchMyRoom = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/api/rooms/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        const active = data.rooms.find((r) => r.status === "active" && r.isActive);
        setRoom(active || null);
      } else {
        setRoomError("Could not load your rooms.");
      }
    } catch {
      setRoomError("Network error. Please try again.");
    } finally {
      setRoomLoading(false);
    }
  }, [token]);

  // ── fetch messages for a room ──────────────────────────────────────────────
  const fetchMessages = useCallback(async (roomId) => {
    try {
      const res  = await fetch(`${API}/api/messages/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setChatMessages(data.messages);
    } catch {
      /* silently ignore poll errors */
    }
  }, [token]);

  // ── on mount: load room ────────────────────────────────────────────────────
  useEffect(() => {
    fetchMyRoom();
  }, [fetchMyRoom]);

  // ── when room changes: load messages + start polling ──────────────────────
  useEffect(() => {
    if (!room) {
      clearInterval(pollRef.current);
      setChatMessages([]);
      return;
    }
    fetchMessages(room.roomId);
    pollRef.current = setInterval(() => fetchMessages(room.roomId), POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [room, fetchMessages]);

  // ── auto-scroll chat ───────────────────────────────────────────────────────
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // ── send message ───────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!chatInput.trim() || !room) return;
    setSending(true);
    try {
      const res  = await fetch(`${API}/api/messages`, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({ roomId: room.roomId, message: chatInput.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setChatInput("");
        fetchMessages(room.roomId);
      }
    } catch { /* ignore */ }
    setSending(false);
  };

  // ── clear chat ─────────────────────────────────────────────────────────────
  const handleClear = async () => {
    if (!room || !window.confirm("Clear all messages in this session?")) return;
    setClearing(true);
    try {
      await fetch(`${API}/api/messages/clear/${room.roomId}`, {
        method:  "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatMessages([]);
    } catch { /* ignore */ }
    setClearing(false);
  };

  // ── callback when room created from modal ─────────────────────────────────
  const handleRoomCreated = () => {
    setIsModalOpen(false);
    setRoomLoading(true);
    fetchMyRoom();
  };

  // ── format message time ───────────────────────────────────────────────────
  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ── loading ───────────────────────────────────────────────────────────────
  if (roomLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <LecturerSidebar onCreateRoom={() => setIsModalOpen(true)} />
        <div className="flex flex-col items-center gap-4 opacity-60">
          <span className="material-symbols-outlined text-5xl text-[#0040a1] animate-spin">
            progress_activity
          </span>
          <p className="text-sm font-semibold text-[#424654]">Loading your session…</p>
        </div>
      </div>
    );
  }

  // ── NO ACTIVE ROOM ────────────────────────────────────────────────────────
  if (!room) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e]">
        <LecturerSidebar onCreateRoom={() => setIsModalOpen(true)} />
        <TopBar mode="lecturer" title="Academic Atelier" subtitle="Live Session" />

        <CreateRoomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRoomCreated={handleRoomCreated}
        />

        <main className="md:ml-64 pt-20 px-4 md:px-8 pb-24 md:pb-8 flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full text-center">
            {/* Illustration blob */}
            <div className="relative mx-auto mb-8 w-40 h-40">
              <div className="absolute inset-0 rounded-full bg-[#dae2ff] blur-2xl opacity-60" />
              <div className="relative w-40 h-40 rounded-full bg-[#eef1ff] flex items-center justify-center border border-[#c3c6d6]/20 shadow-sm">
                <span className="material-symbols-outlined text-6xl text-[#0040a1]">
                  sensors_off
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight mb-3">
              No Active Session
            </h2>
            <p className="text-[#424654] text-sm leading-relaxed mb-8">
              You don't have a session running at this time.
              <br />
              Create a new room to start a live session with your students.
            </p>

            {roomError && (
              <p className="text-red-500 text-xs mb-4">{roomError}</p>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-[#0040a1] to-[#0056d2] text-white text-sm font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-[0.97] transition-all"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Create New Room
            </button>

            <p className="mt-6 text-[11px] text-[#737785]">
              Once you create a room, it will appear here automatically.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ── ACTIVE ROOM ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e]">
      <LecturerSidebar onCreateRoom={() => setIsModalOpen(true)} />
      <TopBar
        mode="lecturer"
        title="Academic Atelier"
        subtitle={`Session: ${room.courseName}`}
      />

      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRoomCreated={handleRoomCreated}
      />

      <main className="md:ml-64 pt-20 px-4 md:px-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">

          {/* ── Top hero card ──────────────────────────────────────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-[#f2f4f6] rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10">
                {/* Live badge */}
                <div className="inline-flex items-center gap-2 bg-[#0040a1]/10 text-[#0040a1] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#0040a1] animate-pulse" />
                  Live Now
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
                  {room.courseName}
                </h2>
                <p className="text-[#424654] max-w-2xl leading-relaxed text-sm md:text-base">
                  Your session is currently active in{" "}
                  <span className="text-[#0040a1] font-semibold">{room.hall}</span>.
                  &nbsp;Room ID:{" "}
                  <span className="font-mono text-xs bg-[#dae2ff] text-[#0040a1] px-1.5 py-0.5 rounded">
                    {room.roomId}
                  </span>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 relative z-10">
                <button className="bg-[#0056d2] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[0.98] transition-all">
                  <span className="material-symbols-outlined text-lg">sensors</span>
                  Broadcast Announcement
                </button>

                <button className="bg-white text-[#424654] px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#e0e3e5] transition-all">
                  <span className="material-symbols-outlined text-lg">share</span>
                  Invite Panelist
                </button>
              </div>

              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#0040a1]/5 rounded-full blur-3xl group-hover:bg-[#0040a1]/10 transition-colors" />
            </div>

            <div className="md:col-span-4 bg-[#f2f4f6] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-[#0040a1] text-3xl">
                  chat_bubble
                </span>
              </div>
              <p className="text-[#424654] text-sm font-medium mb-1">Chat Messages</p>
              <h3 className="text-5xl font-extrabold">{chatMessages.length}</h3>
              <p className="text-[11px] font-bold text-[#0040a1] mt-2 uppercase tracking-widest">
                In this session
              </p>
            </div>
          </section>

          {/* ── Chat panel ────────────────────────────────────────────────── */}
          <section>
            <div className="bg-white border border-[#c3c6d6]/20 rounded-2xl flex flex-col h-[520px] overflow-hidden shadow-sm">
              {/* Header */}
              <div className="p-4 bg-[#f2f4f6] flex items-center gap-3">
                <span className="material-symbols-outlined text-[#0040a1]">chat_bubble</span>
                <h5 className="font-bold text-sm">Session Chat</h5>
                <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  Public
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 opacity-50">
                    <span className="material-symbols-outlined text-4xl text-[#c3c6d6]">
                      chat
                    </span>
                    <p className="text-xs text-[#737785]">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  chatMessages.map((msg) => {
                    const isCurrentUser =
                      msg.senderType === "lecturer" || msg.senderType === "admin";
                    return (
                      <div
                        key={msg._id}
                        className={`flex flex-col max-w-[85%] ${
                          isCurrentUser
                            ? "items-end self-end ml-auto"
                            : "items-start"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-xl shadow-sm ${
                            isCurrentUser
                              ? "bg-gradient-to-br from-[#0040a1] to-[#0056d2] text-white rounded-br-sm"
                              : "bg-[#dbe0e5] text-[#5e6368] rounded-bl-sm"
                          }`}
                        >
                          <p className="text-xs leading-relaxed">{msg.message}</p>
                        </div>
                        <span className="text-[10px] text-[#424654] mt-1 px-1">
                          {msg.senderName} • {formatTime(msg.createdAt)}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white/85 backdrop-blur-md border-t border-[#c3c6d6]/10">
                <div className="bg-[#e0e3e5] rounded-xl p-3 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0040a1]/20 transition-all">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message to the hall…"
                    className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-[#424654]/60 text-[#191c1e]"
                  />
                  <button
                    onClick={handleSend}
                    disabled={sending || !chatInput.trim()}
                    className="text-[#0040a1] hover:scale-110 transition-transform disabled:opacity-40"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>

                <div className="flex justify-between items-center mt-3 px-1">
                  <div className="flex gap-2">
                    <button className="text-[#424654] hover:text-[#0040a1] transition-colors">
                      <span className="material-symbols-outlined text-lg">attachment</span>
                    </button>
                    <button className="text-[#424654] hover:text-[#0040a1] transition-colors">
                      <span className="material-symbols-outlined text-lg">mood</span>
                    </button>
                  </div>
                  <button
                    onClick={handleClear}
                    disabled={clearing}
                    className="text-[10px] font-bold text-[#822800] uppercase tracking-widest hover:underline disabled:opacity-40"
                  >
                    {clearing ? "Clearing…" : "Clear History"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 py-3 md:hidden bg-white/85 backdrop-blur-md border-t border-[#c3c6d6]/20 shadow-[0px_-10px_30px_rgba(25,28,30,0.06)] rounded-t-2xl">
        <a className="flex flex-col items-center justify-center text-[#424654] transition-all" href="#">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Chat</span>
        </a>
        <a
          className="flex flex-col items-center justify-center bg-[#0056D2] text-white rounded-xl px-4 py-1 scale-95"
          href="#"
        >
          <span className="material-symbols-outlined">info</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Hall Info</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#424654] transition-all" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </a>
      </nav>
    </div>
  );
};

export default LiveSessionLecturer;