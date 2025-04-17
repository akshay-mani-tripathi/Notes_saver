import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Veiw_paste = () => {
  const { id } = useParams();
  const allpaste = useSelector((state) => state.paste.pastes);
  const paste = allpaste.find((p) => p._id === id);

  const handleCopy = () => {
    if (paste?.content) {
      navigator.clipboard.writeText(paste.content);
      toast.success("Content copied to clipboard!");
    }
  };

  if (!paste) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-600">
        <p className="text-xl font-medium">Paste not found 😕</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800 w-[1000px]">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-200 relative">
        {/* Header with Copy Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-indigo-600">View Paste</h2>
          <button
            onClick={handleCopy}
            className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm"
          >
            Copy
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={paste.title}
            disabled
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-600 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            value={paste.content}
            disabled
            rows={15}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-600 shadow-sm resize-none"
          />
        </div>

        <p className="text-xs text-gray-400 mt-4">Created: {new Date(paste.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Veiw_paste;
