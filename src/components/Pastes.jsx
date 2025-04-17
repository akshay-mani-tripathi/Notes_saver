import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFrompastes, updateTopastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste?.pastes || []);
  const [searchTerm, setsearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handledelete(pasteId) {
    dispatch(removeFrompastes(pasteId));
  }
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600 drop-shadow-sm">
        All Your Pastes
      </h2>

      <div>
        <input
          className="p-3 rounded-xl w-full max-w-2xl bg-white border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          type="search"
          placeholder="🔍 Search by title..."
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
      </div>
      <br />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            return (
              <div
                className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
                key={paste?._id}
              >
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                  {paste.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 whitespace-pre-wrap line-clamp-4">
                  {paste.content}
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <button>
                    <NavLink
                      to={`/?pasteId=${paste?._id}`}
                      className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition"
                    >
                      Edit
                    </NavLink>
                  </button>
                  <button>
                    <NavLink
                      to={`/pastes/${paste?._id}`}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                    >
                      View
                    </NavLink>
                  </button>
                  <button
                    onClick={() => handledelete(paste?._id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition"
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/pastes/${paste?._id}`;
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Shareable link copied!");
                    }}
                  >
                    Share
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  Created: {new Date(paste.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No pastes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Pastes;
