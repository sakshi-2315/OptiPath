"use client";

import { useState } from "react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a resume first!");
      return;
    }

    setLoading(true);
    setResult("");

    // Simulate an API call
    setTimeout(() => {
      setResult("✅ Resume ATS Score: 85%");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-24 text-center">
      <h1 className="text-3xl font-bold mb-4">AI Resume Analyzer</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="p-2 border border-gray-500 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 text-black rounded w-2/3 whitespace-pre-wrap text-lg font-semibold">
          {result}
        </div>
      )}
    </div>
  );
}
