import React, { useState, useEffect } from 'react';

export default function CommentForm({ onCancel, onSubmit, initialData }) {
    const [fieldLabel, setFieldLabel] = useState("");
    const [comment, setComment] = useState("");
    const [file, setFile] = useState(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFieldLabel(initialData.fieldLabel || "");
            setComment(initialData.comment || "");
            setFile(initialData.file || null);
        }
    }, [initialData]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile({
                name: selectedFile.name,
                type: selectedFile.name.split('.').pop().toUpperCase()
            });
        }
    };

    const handleClearAndSubmit = () => {
        if (!comment.trim()) {
            setShowError(true);
            return;
        }
        onSubmit({ fieldLabel, comment, file });
        setShowError(false);
        setFieldLabel("");
        setComment("");
        setFile(null);
    };

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm animate-in zoom-in duration-200">
            <div className="mb-3">
                <p className="text-gray-400 text-[9px] font-bold uppercase tracking-tight">Current Value</p>
                <p className="text-gray-800 text-[11px] font-medium italic opacity-60 truncate">"The quick brown fox jumps over the lazy dog"</p>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="text-gray-400 text-[9px] font-bold uppercase block mb-0.5">Field label</label>
                    <input
                        value={fieldLabel}
                        onChange={(e) => setFieldLabel(e.target.value)}
                        placeholder="e.g. Placeholder"
                        className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-red-400 outline-none"
                    />
                </div>

                <div>
                    <label className="text-gray-400 text-[9px] font-bold uppercase block mb-0.5">Comment <span className="text-red-500">*</span></label>
                    <textarea
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                            if (showError) setShowError(false);
                        }}
                        placeholder="Reason for change"
                        rows="2"
                        className={`w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-red-400 outline-none resize-none ${showError ? 'border-red-500 bg-red-50' : ''}`}
                    />
                    {showError && <p className="text-red-500 text-[9px] mt-1 font-bold italic">⚠️ Comment is required</p>}
                </div>
                <label className="text-gray-400 text-[9px] font-bold uppercase block mb-0.5">Upload supporting document</label>

                <div className="relative border border-gray-300 rounded-lg p-2 flex items-center justify-between overflow-hidden hover:bg-gray-50 transition-colors">
                    <span className="text-gray-400 text-[10px] truncate pr-4">{file ? `✅ ${file.name}` : "Attach document"}</span>
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <span className="text-gray-400 text-xs shrink-0">📎</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button onClick={onCancel} className="text-orange-500 border border-orange-500 rounded-full text-[10px] font-bold px-4 py-1.5">Discard</button>
                <button
                    onClick={handleClearAndSubmit}
                    className="bg-red-500 text-white text-[10px] font-bold px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition-colors"
                >
                    {initialData ? "Update" : "Submit"}
                </button>
            </div>
        </div>
    );
}
