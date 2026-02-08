import React, { useState,useRef,useEffect } from 'react';
import CommentForm from './CommentForm';
import SubmittedCard from './SubmittedCard';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const chatContainerRef = useRef(null);

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Vishwas Gopal Ayyar",
      time: "12:45 pm",
      fieldLabel: "Current Value",
      comment: "All values from Scheme 1 and Scheme 4 are breached",
      file: { name: "Report.pdf", type: "PDF" }
    }
  ]);

  // WhatsApp logic: Automatically scroll to bottom when comments change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth' // Smooth scrolling effect
      });
    }
  }, [comments, isOpen, isAdding]); // Triggers on new comments or opening the box

  const handleSaveComment = (formData) => {
    if (editingComment) {
      setComments(comments.map(c => c.id === editingComment.id ? { ...c, ...formData } : c));
    } else {
      const newEntry = {
        id: Date.now(),
        user: "Pratap Agarwal",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...formData
      };
      setComments([...comments, newEntry]);
    }
    setIsAdding(false);
    setEditingComment(null);
  };

  const deleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const startEdit = (comment) => {
    setEditingComment(comment);
    setIsAdding(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      {/* --- BACKGROUND CONTENT --- */}
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 text-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 sm:mb-6 tracking-tight leading-tight">
            Component Development <span className="text-indigo-600">Assignment</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed px-2">
            A modular React system with CRUD capabilities. Fully optimized for mobile, tablet, and desktop views.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium text-xs sm:text-sm border border-indigo-100 animate-pulse">
            ✨ Click "Comments" to interact
          </div>
        </div>
      </div>


      <div className="fixed bottom-4 right-4 sm:bottom-10 sm:right-10 flex flex-col items-end z-50">
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white border shadow-xl px-4 py-2.5 rounded-2xl flex items-center gap-3 font-bold text-indigo-700 transition-all active:scale-95"
        >
          <span className="text-xs uppercase tracking-wider">Comments</span>
          <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full tracking-tighter">
            {comments.length}
          </span>
        </button>

        {isOpen && (
          <div className="w-[92vw] sm:w-[380px] h-[480px] sm:h-[550px] max-h-[82vh] bg-white mt-4 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in fade-in slide-in-from-bottom-5">

            {/* REFINED HEADER: Tightened Space */}
            <div className="py-1.5 px-5 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm">💬</span>
                <span className="font-bold text-[13px] text-slate-800 tracking-tight">Comment Section</span>
              </div>
              <button
                onClick={() => { setIsOpen(false); setIsAdding(false); setEditingComment(null); }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            {/* CONTENT AREA WITH BLACK SCROLLBAR */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3 custom-black-scrollbar bg-gray-50/30">
              {isAdding ? (
                <CommentForm
                  onCancel={() => { setIsAdding(false); setEditingComment(null); }}
                  onSubmit={handleSaveComment}
                  initialData={editingComment}
                />
              ) : (
                comments.map((c) => (
                  <div key={c.id}>
                    <div className="flex justify-between items-center mb-1 px-1">
                      <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">{c.user}</span>
                      <span className="text-[9px] text-gray-400 italic">{c.time}</span>
                    </div>
                    <SubmittedCard
                      data={c}
                      onDelete={() => deleteComment(c.id)}
                      onEdit={() => startEdit(c)}
                    />
                  </div>
                ))
              )}
            </div>

            {/* REFINED FOOTER: Tightened Space */}
            {!isAdding && (
              <div className="p-2.5 bg-white border-t border-gray-100 shrink-0">
                <button
                  onClick={() => setIsAdding(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-bold text-xs transition-colors shadow-sm"
                >
                  Comment
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* BLACK SCROLLBAR CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
      .custom-black-scrollbar::-webkit-scrollbar { width: 4px; }
      .custom-black-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-black-scrollbar::-webkit-scrollbar-thumb { background: grey; border-radius: 10px; }
    `}} />
    </div>
  );
}