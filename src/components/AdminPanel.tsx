import React, { useState } from "react";
import { Lock, Eye, Trash2, Edit, Save, RotateCcw, X, Plus, Check } from "lucide-react";
import { VideoItem } from "../types";

interface AdminPanelProps {
  videos: VideoItem[];
  onSaveVideos: (updatedVideos: VideoItem[]) => void;
  onResetToDefaults: () => void;
}

export default function AdminPanel({ videos, onSaveVideos, onResetToDefaults }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Edit list states
  const [tempVideos, setTempVideos] = useState<VideoItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Simple editing states for active video
  const [editTitle, setEditTitle] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editViews, setEditViews] = useState("");
  const [editUploadTime, setEditUploadTime] = useState("");

  const handleOpenClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering ad redirect!
    setIsOpen(true);
    setPassword("");
    setErrorMsg("");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1231123") {
      setIsAuthenticated(true);
      setTempVideos([...videos]);
      setErrorMsg("");
    } else {
      setErrorMsg("Incorrect password! Please try again.");
    }
  };

  const startEditing = (video: VideoItem) => {
    setEditingId(video.id);
    setEditTitle(video.title);
    setEditImageUrl(video.imageUrl);
    setEditDuration(video.duration);
    setEditViews(video.views);
    setEditUploadTime(video.uploadTime);
  };

  const saveIndividualVideo = (id: string) => {
    const updated = tempVideos.map((v) => {
      if (v.id === id) {
        return {
          ...v,
          title: editTitle,
          imageUrl: editImageUrl,
          duration: editDuration,
          views: editViews,
          uploadTime: editUploadTime,
        };
      }
      return v;
    });
    setTempVideos(updated);
    setEditingId(null);
  };

  const handleAddVideo = () => {
    const newVideo: VideoItem = {
      id: Date.now().toString(),
      title: "New Video Title",
      imageUrl: "https://i.postimg.cc/FHLD2BFM/xn-9-t.jpg",
      duration: "10:00",
      views: "10k",
      uploadTime: "Just now",
    };
    const updated = [...tempVideos, newVideo];
    setTempVideos(updated);
    startEditing(newVideo);
  };

  const handleDeleteVideo = (id: string) => {
    const updated = tempVideos.filter((v) => v.id !== id);
    setTempVideos(updated);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleApplyChanges = () => {
    onSaveVideos(tempVideos);
    setIsOpen(false);
    setIsAuthenticated(false);
    setEditingId(null);
  };

  const handleResetToDefaultsClick = () => {
    if (confirm("Are you sure you want to restore all settings and videos to their defaults?")) {
      onResetToDefaults();
      setIsAuthenticated(false);
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsAuthenticated(false);
    setEditingId(null);
  };

  return (
    <div className="relative">
      {/* Hidden button: Styled to look like a simple text dot in the footer */}
      <button
        onClick={handleOpenClick}
        title="Admin Settings"
        className="text-slate-700 hover:text-slate-300 transition-colors font-bold text-lg select-none px-2 focus:outline-none"
        style={{ cursor: "default" }}
      >
        .
      </button>

      {/* Admin Panel Modal Overlay */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()} // Stop triggering ad clicks inside modal!
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2 text-red-500 font-bold">
                <Lock size={18} />
                <span>Admin Control Panel</span>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-grow overflow-y-auto p-6">
              {!isAuthenticated ? (
                /* Password Entry view */
                <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-sm mx-auto my-8">
                  <p className="text-sm text-slate-400 text-center">
                    Enter the access password to open Admin Panel:
                  </p>
                  <div>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-red-500 text-center tracking-wider text-lg font-mono font-bold text-white transition-colors"
                      autoFocus
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-xs text-red-500 text-center font-semibold">
                      {errorMsg}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-500 font-bold rounded-xl transition-colors text-white text-sm"
                  >
                    Login
                  </button>
                </form>
              ) : (
                /* Edit Videos view */
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800/60">
                    <span className="text-xs text-slate-400 font-semibold">
                      Edit Thumbnails (Total {tempVideos.length} videos)
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddVideo}
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-xs font-bold text-white rounded-lg transition-colors"
                      >
                        <Plus size={14} /> Add Video
                      </button>
                      <button
                        onClick={handleResetToDefaultsClick}
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700/55"
                      >
                        <RotateCcw size={14} /> Reset Defaults
                      </button>
                    </div>
                  </div>

                  {/* List of videos in Admin Panel */}
                  <div className="space-y-4">
                    {tempVideos.map((video, idx) => (
                      <div
                        key={video.id}
                        className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col gap-4 relative"
                      >
                        <div className="absolute top-4 right-4 flex gap-1.5">
                          {editingId !== video.id ? (
                            <>
                              <button
                                onClick={() => startEditing(video)}
                                type="button"
                                className="p-1 px-2.5 bg-sky-900/40 hover:bg-sky-800 text-sky-400 rounded text-xs flex items-center gap-1 transition-colors"
                              >
                                <Edit size={12} /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteVideo(video.id)}
                                type="button"
                                className="p-1 px-2 bg-red-900/40 hover:bg-red-800 text-red-400 rounded text-xs flex items-center gap-1 transition-colors"
                              >
                                <Trash2 size={12} /> Delete
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => saveIndividualVideo(video.id)}
                              type="button"
                              className="p-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs flex items-center gap-1 transition-colors"
                            >
                              <Check size={12} /> Save
                            </button>
                          )}
                        </div>

                        {/* Title of block */}
                        <div className="text-xs font-bold text-red-500 font-mono">
                          Video #{idx + 1}
                        </div>

                        {editingId !== video.id ? (
                          /* Readonly display in admin */
                          <div className="flex gap-3">
                            <img
                              src={video.imageUrl}
                              alt=""
                              className="w-24 aspect-video object-cover rounded border border-slate-800"
                            />
                            <div className="min-w-0">
                              <h4 className="text-sm font-semibold text-slate-200 line-clamp-1">{video.title}</h4>
                              <p className="text-xs text-slate-400 mt-1">Duration: {video.duration} | Views: {video.views}</p>
                              <p className="text-[10px] text-slate-500 mt-1 overflow-x-auto truncate">Image: {video.imageUrl}</p>
                            </div>
                          </div>
                        ) : (
                          /* Edit form fields */
                          <div className="space-y-3 pt-2 text-xs">
                            <div>
                              <label className="block text-slate-400 mb-1 font-semibold">Thumbnail Image URL</label>
                              <input
                                type="text"
                                value={editImageUrl}
                                onChange={(e) => setEditImageUrl(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded font-mono text-slate-200 focus:outline-none focus:border-red-500"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 mb-1 font-semibold">Video Title</label>
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-red-500"
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="block text-slate-400 mb-1 font-semibold">Duration</label>
                                <input
                                  type="text"
                                  placeholder="e.g. 6:54"
                                  value={editDuration}
                                  onChange={(e) => setEditDuration(e.target.value)}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-400 mb-1 font-semibold">Views</label>
                                <input
                                  type="text"
                                  placeholder="e.g. 4.7M"
                                  value={editViews}
                                  onChange={(e) => setEditViews(e.target.value)}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-400 mb-1 font-semibold">Upload Time</label>
                                <input
                                  type="text"
                                  placeholder="e.g. 2 hours ago"
                                  value={editUploadTime}
                                  onChange={(e) => setEditUploadTime(e.target.value)}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Actions footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex justify-end gap-3">
                    <button
                      onClick={handleClose}
                      type="button"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-sm font-bold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApplyChanges}
                      type="button"
                      className="flex items-center gap-1 px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-red-900/30"
                    >
                      <Save size={16} /> Save All Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
