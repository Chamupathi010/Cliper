import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Data ─────────────────────────────────────────── */

const features = [
    {
        icon: '🎭',
        title: 'Anonymous Lecture Q&A',
        desc: 'Ask questions during live lectures without revealing your identity. No judgment, just learning.',
        tag: 'Live',
        color: 'from-blue-500/10 to-blue-500/5 border-blue-500/30 text-blue-400',
    },
    {
        icon: '💬',
        title: 'Public Q&A Forum',
        desc: 'Post questions to the whole university community — anonymously or with your identity. Get answers fast.',
        tag: 'Community',
        color: 'from-purple-500/10 to-purple-500/5 border-purple-500/30 text-purple-400',
    },
    {
        icon: '📚',
        title: 'Document Library',
        desc: 'Organized by subject and week. Access lecture notes, study guides, and resources 24/7 at your pace.',
        tag: 'Resources',
        color: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 text-cyan-400',
    },
    {
        icon: '📱',
        title: 'QR Attendance',
        desc: 'Scan a QR code to mark attendance in seconds. No disruptions. Real-time records for lecturers.',
        tag: 'Smart',
        color: 'from-pink-500/10 to-pink-500/5 border-pink-500/30 text-pink-400',
    },
];

const stats = [
    { value: '100%', label: 'Anonymous Protection' },
    { value: '4', label: 'Core Modules' },
    { value: '24/7', label: 'Resource Access' },
    { value: '0', label: 'Judgment Zone' },
];

const problems = [
    { icon: '😰', title: 'Fear of Judgment', desc: 'Students hesitate to ask questions in class due to social anxiety or fear of embarrassment.' },
    { icon: '📉', title: 'Poor Academic Outcomes', desc: 'Unresolved doubts lead to reduced confidence, lower grades, and disengagement from learning.' },
    { icon: '🕳️', title: 'No Structured Support', desc: 'Existing systems lack anonymous, organized tools for shy or introverted students to thrive.' },
];

const floatCards = [
    { icon: '🎭', title: 'Anonymous Q&A', sub: 'Ask freely, learn boldly', delay: 'animate-float' },
    { icon: '📱', title: 'QR Attendance', sub: 'Marked in 3 seconds', delay: 'animate-float-2' },
    { icon: '🔐', title: 'Secure & Private', sub: 'Your identity protected', delay: 'animate-float-3' },
];

/* ─── Component ─────────────────────────────────────── */

export default function LandingPage() {
    const navigate = useNavigate();
    const heroRef = useRef(null);

    // Subtle parallax on mouse move
    useEffect(() => {
        const onMove = (e) => {
            if (!heroRef.current) return;
            const xPct = (e.clientX / window.innerWidth - 0.5) * 18;
            const yPct = (e.clientY / window.innerHeight - 0.5) * 10;
            heroRef.current.style.setProperty('--mx', `${xPct}px`);
            heroRef.current.style.setProperty('--my', `${yPct}px`);
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#080d1a] text-[#f0f4ff]">

            {/* ── Navbar ─────────────────────────────────────── */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-[#080d1a]/75 backdrop-blur-xl">
                <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <span className="font-[Space_Grotesk] text-xl font-extrabold tracking-wide gradient-text">Cliper</span>
                        <span className="hidden sm:block text-xs text-[#4b5a72]">Academic Support System</span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-7">
                        <a href="#features" className="text-sm text-[#94a3b8] hover:text-white transition-colors">Features</a>
                        <a href="#about" className="text-sm text-[#94a3b8] hover:text-white transition-colors">About</a>
                        <button
                            id="nav-signin-btn"
                            onClick={() => navigate('/signin')}
                            className="text-sm font-semibold text-blue-400 border border-blue-500/30 rounded-full px-5 py-2 hover:bg-blue-500/10 transition-all"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Hero ───────────────────────────────────────── */}
            <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">

                {/* Glow orbs */}
                <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] pointer-events-none animate-float" />
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none animate-float-2" />
                <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none animate-float-3" />

                <div className="relative z-10 mx-auto max-w-6xl px-6 flex flex-col lg:flex-row items-center gap-12 py-24">

                    {/* Left content */}
                    <div className="flex-1 animate-fade-up">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 rounded-full px-4 py-2 mb-8">
                            🎓University Academic Support System
                        </div>

                        <h1 className="font-[Space_Grotesk] text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6">
                            Learn Without <span className="gradient-text">Fear.</span><br />
                            Ask Without <span className="gradient-text">Limits.</span>
                        </h1>

                        <p className="text-lg text-[#94a3b8] leading-relaxed max-w-xl mb-10">
                            A safe, inclusive, and judgment-free digital environment where every student
                            can participate, ask questions anonymously, and access academic resources — all in one place.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-wrap items-center gap-4 mb-14">
                            <button
                                id="hero-get-started-btn"
                                onClick={() => navigate('/signin')}
                                className="gradient-btn text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-blue-500/50 transition-all duration-200"
                            >
                                Get Started →
                            </button>
                            <a
                                href="#features"
                                className="text-base font-semibold text-[#94a3b8] border border-white/10 rounded-full px-8 py-3.5 hover:bg-white/5 hover:text-white transition-all"
                            >
                                Explore Features
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-10">
                            {stats.map((s, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="font-[Space_Grotesk] text-3xl font-extrabold gradient-text">{s.value}</span>
                                    <span className="text-xs uppercase tracking-widest text-[#4b5a72]">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — float cards */}
                    <div className="hidden xl:flex flex-col gap-4 flex-shrink-0">
                        {floatCards.map((c, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-4 bg-white/[0.04] backdrop-blur-md border border-white/[0.07] rounded-2xl px-5 py-4 min-w-[230px] hover:-translate-x-2 transition-transform duration-300 ${c.delay}`}
                            >
                                <span className="text-2xl">{c.icon}</span>
                                <div>
                                    <p className="text-sm font-semibold text-white">{c.title}</p>
                                    <p className="text-xs text-[#4b5a72] mt-0.5">{c.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Problem Section ─────────────────────────────── */}
            <section id="about" className="py-28 bg-[#0d1529] border-y border-white/[0.07]">
                <div className="mx-auto max-w-6xl px-6">

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 rounded-full px-4 py-2 mb-5">
                            ⚠️ The Problem
                        </div>
                        <h2 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                            The <span className="gradient-text">Silent Struggle</span> in Every Classroom
                        </h2>
                        <p className="text-[#94a3b8] text-lg max-w-lg mx-auto leading-relaxed">
                            Millions of students hold back questions every day. We built UASS to change that.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {problems.map((p, i) => (
                            <div
                                key={i}
                                className="bg-[#111827] border border-white/[0.07] rounded-2xl p-9 hover:border-blue-500/30 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="text-4xl mb-5">{p.icon}</div>
                                <h3 className="font-[Space_Grotesk] text-xl font-bold mb-3">{p.title}</h3>
                                <p className="text-[#94a3b8] text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features Section ─────────────────────────────── */}
            <section id="features" className="py-28">
                <div className="mx-auto max-w-6xl px-6">

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 rounded-full px-4 py-2 mb-5">
                            ✨ Core Modules
                        </div>
                        <h2 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                            Everything You Need to <span className="gradient-text">Thrive Academically</span>
                        </h2>
                        <p className="text-[#94a3b8] text-lg max-w-lg mx-auto leading-relaxed">
                            Four powerful modules designed to solve real problems faced by students and lecturers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className={`relative group bg-gradient-to-br ${f.color} border rounded-2xl p-9 overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-default`}
                            >
                                <span className="text-5xl block mb-4">{f.icon}</span>
                                <span className={`inline-block text-xs font-bold uppercase tracking-widest border rounded-full px-3 py-1 mb-4 ${f.color}`}>
                                    {f.tag}
                                </span>
                                <h3 className="font-[Space_Grotesk] text-xl font-bold text-white mb-3">{f.title}</h3>
                                <p className="text-sm text-[#94a3b8] leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Quote ────────────────────────────────────────── */}
            <section className="py-24 bg-[#0d1529] border-y border-white/[0.07]">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <div className="font-[Space_Grotesk] text-8xl leading-none text-blue-500/30 mb-4">"</div>
                    <blockquote className="font-[Space_Grotesk] text-2xl sm:text-3xl font-semibold leading-relaxed text-white mb-6">
                        Every student deserves a safe space to learn, grow, and ask questions without fear.
                        UASS is that space — built for you.
                    </blockquote>
                    <p className="text-xs uppercase tracking-widest text-[#4b5a72]">— UASS Design Principle</p>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────── */}
            <section className="py-28">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="relative bg-[#111827] border border-white/[0.07] rounded-3xl p-16 text-center overflow-hidden">

                        {/* Glow */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="relative inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 rounded-full px-4 py-2 mb-6">
                            🚀 Ready to Join?
                        </div>

                        <h2 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                            Start Your <span className="gradient-text">Journey</span> Today
                        </h2>
                        <p className="text-[#94a3b8] text-lg max-w-md mx-auto mb-9 leading-relaxed">
                            Sign in with your SLIIT university ID and join a smarter, more inclusive learning community.
                        </p>

                        <button
                            id="cta-signin-btn"
                            onClick={() => navigate('/signin')}
                            className="gradient-btn text-white font-bold text-base px-10 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-blue-500/50 transition-all duration-200"
                        >
                            Sign In with Student ID →
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Footer ───────────────────────────────────────── */}
            <footer className="border-t border-white/[0.07] bg-[#0d1529] pt-16 pb-0">
                <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">

                    {/* Brand */}
                    <div>
                        <span className="font-[Space_Grotesk] text-2xl font-extrabold gradient-text tracking-wide block mb-2">UASS</span>
                        <p className="text-sm text-[#94a3b8]">University Academic Support System</p>
                        <p className="text-xs text-[#4b5a72] mt-3">Built for SLIIT · Empowering every student · 2025</p>
                    </div>

                    {/* Links */}
                    {[
                        { title: 'Platform', links: [['Features', '#features'], ['About', '#about'], ['Sign In', '/signin']] },
                        { title: 'Modules', links: [['Anonymous Q&A', '#'], ['Document Library', '#'], ['QR Attendance', '#']] },
                    ].map((col, i) => (
                        <div key={i}>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#4b5a72] mb-4">{col.title}</p>
                            <div className="flex flex-col gap-3">
                                {col.links.map(([label, href], j) => (
                                    <a key={j} href={href} className="text-sm text-[#94a3b8] hover:text-white transition-colors">{label}</a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/[0.07] py-5 text-center">
                    <p className="text-xs text-[#4b5a72]">© 2025 UASS — University Academic Support System. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}
