import React from 'react';

export default function SubmittedCard({ data, onDelete, onEdit }) {
    const getBadgeColor = (type) => {
        if (!type) return 'bg-gray-500';
        if (['JPG', 'JPEG', 'PNG'].includes(type)) return 'bg-blue-500';
        if (type === 'PDF') return 'bg-red-500';
        if (['DOC', 'DOCX'].includes(type)) return 'bg-indigo-500';
        return 'bg-emerald-600';
    };

    return (
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 animate-in slide-in-from-right-2">
            
            {data.fieldLabel && (
                <p className="text-indigo-600 text-[9px] font-bold uppercase mb-1 tracking-tight">
                    {data.fieldLabel}
                </p>
            )}

            <div className="mb-2">
                <p className="text-gray-700 text-xs leading-snug font-medium">{data.comment}</p>
            </div>

            {data.file && (
                <div className="mb-2 p-1.5 bg-gray-50 border border-gray-100 rounded-lg flex items-center gap-2">
                    <div className={`${getBadgeColor(data.file.type)} text-white text-[8px] font-bold px-1 rounded-sm`}>
                        {data.file.type}
                    </div>
                    <span className="text-gray-600 text-[10px] truncate max-w-[150px]">
                        {data.file.name}
                    </span>
                </div>
            )}

            {/* Compact Action Buttons */}
            <div className="flex justify-between gap-3 pt-2 border-t border-gray-50">
                <button onClick={onDelete} className="text-orange-500 border border-orange-500 rounded-full text-[10px] font-bold px-2 py-1">
                    Delete Comment
                </button>
                <button onClick={onEdit} className="bg-red-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm hover:bg-red-600 transition-colors">
                    Edit Comment
                </button>
            </div>
        </div>
    );
}