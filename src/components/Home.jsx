import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addTopastes, updateTopastes } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allpaste = useSelector((state) => state.paste?.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId, allpaste]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(updateTopastes(paste));
    } else {
      dispatch(addTopastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      toast.success("Content copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800 w-[1000px]">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600 drop-shadow-sm">
        {pasteId ? "Edit Your Paste" : "Create a New Paste"}
      </h2>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-indigo-600">View Paste</h2>
        <button
          onClick={handleCopy}
          className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start justify-between mb-6">
        <input
          type="text"
          placeholder="📌 Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <button
          onClick={createPaste}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md font-semibold transition"
        >
          {pasteId ? "🔁 Update Paste" : "➕ Create Paste"}
        </button>
      </div>

      <textarea
        className="w-full bg-white border border-gray-300 text-gray-700 px-5 py-4 rounded-xl min-h-[300px] resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-500"
        value={value}
        placeholder="📝 Write your content here..."
        rows={20}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Home;
