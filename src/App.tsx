import React, { useState, useEffect } from "react";
import { Play, Download, Search, HelpCircle, Eye, AlertTriangle, Disc, Flame, ShieldAlert, BadgeCheck, Radio, Sparkles } from "lucide-react";
import { VideoItem } from "./types";
import VideoCard from "./components/VideoCard";
import AdminPanel from "./components/AdminPanel";

// The hardcoded, default pre-populated videos requested by the user
const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    imageUrl: "https://i.postimg.cc/FHLD2BFM/xn-9-t.jpg",
    title: "Indian hot neighbors Bhabhi amazing erotic sex with Punjabi man! Clear Hindi audio",
    duration: "6:54",
    views: "4.7M",
    uploadTime: "3 hours ago"
  },
  {
    id: "v2",
    imageUrl: "https://i.postimg.cc/vHPJQksB/xn-27-t.jpg",
    title: "Desi Sexy girl Hardcore Sex! Love you babe",
    duration: "7:54",
    views: "5.2M",
    uploadTime: "5 hours ago"
  },
  {
    id: "v3",
    imageUrl: "https://i.postimg.cc/MTQ6Rxz3/xn-6-t.jpg",
    title: "Desi wife hard core fuking",
    duration: "5:45",
    views: "879k",
    uploadTime: "12 hours ago"
  },
  {
    id: "v4",
    imageUrl: "https://i.postimg.cc/tJX1kL1h/xv-30-t.jpg",
    title: "Desi indian Student College Girl Sex With Her Boyfriend",
    duration: "5:45",
    views: "8.2M",
    uploadTime: "1 day ago"
  }
];

const AD_LINK = "https://awfullylurkgradually.com/cff8edqi98?key=42044210d152629745c5e93002fba4bc";

export default function App() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [liveViewers, setLiveViewers] = useState(14820);

  // Load from local storage on mount, fallback to default videos
  useEffect(() => {
    const saved = localStorage.getItem("tale_viral_videos");
    if (saved) {
      try {
        setVideos(JSON.parse(saved));
      } catch (err) {
        setVideos(DEFAULT_VIDEOS);
      }
    } else {
      setVideos(DEFAULT_VIDEOS);
    }

    // Dynamic fake live viewers simulator to increase conversion and social proof
    const interval = setInterval(() => {
      setLiveViewers((prev) => prev + Math.floor(Math.random() * 51) - 25);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Save updated videos
  const handleSaveVideos = (updatedVideos: VideoItem[]) => {
    setVideos(updatedVideos);
    localStorage.setItem("tale_viral_videos", JSON.stringify(updatedVideos));
  };

  // Reset to initial videos provided by user
  const handleResetToDefaults = () => {
    setVideos(DEFAULT_VIDEOS);
    localStorage.removeItem("tale_viral_videos");
  };

  // Redirection function for the user ad link
  const triggerAdRedirect = () => {
    // Open in a new tab (helps keep user on original landing page to generate more ad impressions!)
    window.open(AD_LINK, "_blank");
  };

  // Prevent double triggers while still letting standard link bubble up
  const handleGlobalClick = (e: React.MouseEvent) => {
    // If the click is inside administration dialogues or components, DO NOT trigger ads!
    // The admin components have their own stopPropagation, but this acts as an extra layer of protection.
    const target = e.target as HTMLElement;
    if (target.closest("[role='dialog']") || target.closest(".admin-button") || target.closest("form")) {
      return;
    }
    
    triggerAdRedirect();
  };

  // Lists of sample categories to represent high target keywords
  const categories = ["All", "Bhabhi", "Desi Sex", "Trending", "Student MMS", "Housewife", "Exclusive"];

  return (
    <div
      onClick={handleGlobalClick}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none"
    >
      {/* Top Banner Alert / Social Hook */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-xs font-bold tracking-wide flex items-center justify-center gap-2 relative overflow-hidden animate-pulse">
        <Radio size={14} className="animate-ping" />
        <span>LIVE VIRAL VIDEO: Click below on any video to stream or download for free now!</span>
        <span className="hidden md:inline bg-white/20 text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded ml-2">
          HD Quality
        </span>
      </div>

      {/* Main Header styled like a high-end black premium tube site */}
      <header className="border-b border-slate-900 bg-slate-950/90 backdrop-blur-md sticky top-0 z-35 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo / Brand block */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30">
            <Play size={18} className="text-white fill-current animate-pulse ml-0.5" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase flex items-center gap-1.5">
            Tale <span className="text-red-500 bg-red-950/50 border border-red-500/30 px-1.5 py-0.5 rounded-md">Viral Link</span>
          </span>
        </div>

        {/* Fake Search Bar - clicking this triggers redirect, as requested */}
        <div className="hidden md:flex items-center max-w-md w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden px-3 py-1.5 focus-within:border-red-600 transition-colors">
          <input
            type="text"
            placeholder="Search videos or thumbnails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent w-full border-none outline-none text-xs text-slate-300 placeholder-slate-500"
          />
          <button type="button" className="text-slate-400 hover:text-white p-1">
            <Search size={16} />
          </button>
        </div>

        {/* Top Status & Indicators */}
        <div className="flex items-center gap-3">
          {/* Live indicator badge */}
          <div className="flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            <span>{liveViewers.toLocaleString()} Online</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-6">
        
        {/* Fake Banner with Urgency Hook */}
        <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-rose-950/60 border border-red-900/30 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 tracking-wider uppercase font-mono bg-red-950/80 border border-red-500/30 px-2.5 py-1 rounded-full">
              <Flame size={12} className="fill-current" />
              EXCLUSIVE VIRAL UPDATES
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tight line-clamp-1">
              Today's Most Trending Hot Video Links!
            </h2>
            <p className="text-xs text-slate-400">
              Download premium viral video files from high-speed secure servers instantly. No registration required.
            </p>
          </div>

          <button
            onClick={triggerAdRedirect}
            type="button"
            className="whitespace-nowrap px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-950/50 flex items-center gap-2"
          >
            <Sparkles size={14} className="animate-spin text-yellow-300" />
            Download All Videos Instantly
          </button>
        </div>

        {/* Category Filter Pills (All clicks trigger ad redirection) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                triggerAdRedirect();
              }}
              type="button"
              className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-slate-900 text-slate-400 hover:text-slate-100 border-slate-800/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Videos Grid Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Flame size={18} className="text-red-500 fill-current" />
              TRENDING VIDEO LIST (Viral Thumbnails)
            </h3>
            <span className="text-xs text-slate-500 font-mono">{videos.length} videos found</span>
          </div>

          {videos.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl">
              <p className="text-sm text-slate-400">No video thumbnails found. Press the secret admin button below to add custom videos!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onAdClick={triggerAdRedirect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Extra conversion trigger banner */}
        <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-6 text-center space-y-4 shadow-inner max-w-xl mx-auto">
          <div className="mx-auto w-10 h-10 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 rounded-full flex items-center justify-center shadow">
            <ShieldAlert size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-200">Server Speed Alert (Traffic High)</h4>
            <p className="text-xs text-slate-400">
              Due to heavy traffic load, file download speeds may experience slight delays. Please click the "Download HD" button of any video block for fast-lane download.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={triggerAdRedirect}
              type="button"
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-all border border-slate-700/65"
            >
              Check Server Status
            </button>
          </div>
        </div>
      </main>

      {/* Footer bar with the inconspicuous hidden dot trigger for Admin panel */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600 font-mono mt-12">
        <div className="flex flex-col items-center justify-center gap-2">
          <p>© 2026 Tale Viral Link. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 opacity-40">
            <span>Server status: Active</span>
            <span>•</span>
            <span>Secure Stream SSL</span>
          </div>
          
          {/* Hidden Admin Tool Trigger */}
          <div className="mt-4 admin-button">
            <AdminPanel
              videos={videos}
              onSaveVideos={handleSaveVideos}
              onResetToDefaults={handleResetToDefaults}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
