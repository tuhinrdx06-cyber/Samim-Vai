import React from "react";
import { Play, Download, Eye, Clock, CheckCircle } from "lucide-react";
import { VideoItem } from "../types";

interface VideoCardProps {
  video: VideoItem;
  onAdClick: () => void;
  key?: React.Key;
}

export default function VideoCard({ video, onAdClick }: VideoCardProps) {
  // We'll trigger the ad click on any button or detail click
  const handleCardClick = (e: React.MouseEvent) => {
    // We let this click propagate to trigger the general ad redirection
    onAdClick();
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300 cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
    >
      {/* Thumbnail block */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={video.imageUrl}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback placeholder if image fails to load
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=640&auto=format&fit=crop`;
          }}
        />
        {/* Play Icon hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play size={28} className="fill-current ml-1" />
          </div>
        </div>

        {/* Video Duration tag */}
        <div className="absolute bottom-2 right-2 bg-black/85 text-white text-xs px-2 py-0.5 rounded font-mono font-semibold tracking-wide">
          {video.duration}
        </div>

        {/* Quality indicator Badge (HD/1080p) */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
          Full HD
        </div>
      </div>

      {/* Video specifics section */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Avatar & text block */}
          <div className="flex gap-3">
            {/* Channel Avatar placeholder */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 font-bold text-sm">
              TV
            </div>

            <div className="flex-grow min-w-0">
              <h3 className="text-sm font-medium text-slate-100 leading-snug line-clamp-2 group-hover:text-red-500 transition-colors duration-200">
                {video.title}
              </h3>
              
              {/* Channel Tag */}
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                <span>Tale Viral Link</span>
                <CheckCircle size={12} className="text-blue-500 fill-current w-3 h-3" />
              </div>

              {/* Views and uploads specifics */}
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-0.5">
                  <Eye size={12} />
                  {video.views}
                </span>
                <span>•</span>
                <span>{video.uploadTime || "2 hours ago"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Watch & Download buttons with high impact */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80">
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-md shadow-emerald-950/20 focus:outline-none"
          >
            <Play size={14} className="fill-current" />
            Watch Online
          </button>
          
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold text-xs rounded-lg transition-colors shadow-md shadow-red-950/20 focus:outline-none"
          >
            <Download size={14} />
            Download HD
          </button>
        </div>
      </div>
    </div>
  );
}
