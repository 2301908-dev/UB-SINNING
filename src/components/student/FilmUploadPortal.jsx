import { useEffect, useRef, useState } from "react";
import { Upload, CheckCircle } from "lucide-react";
import GenreFilter from "./GenreFilter";

const initialForm = {
  title: "",
  category: "",
  synopsis: "",
  certified: false,
};

export default function FilmUploadPortal() {
  const [formData, setFormData] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!selectedFile || uploadProgress >= 100) {
      if (uploadProgress >= 100) {
        setIsUploading(false);
      }
      return;
    }

    setIsUploading(true);
    const timer = window.setTimeout(() => {
      setUploadProgress((current) => Math.min(current + 18, 100));
    }, 300);

    return () => window.clearTimeout(timer);
  }, [selectedFile, uploadProgress]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUploadProgress(0);
    setIsSubmitted(false);
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    setIsDragging(false);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormComplete) {
      setIsSubmitted(true);
    }
  };

  const isFormComplete =
    formData.title.trim() &&
    formData.category.trim() &&
    formData.synopsis.trim() &&
    formData.certified &&
    selectedFile &&
    uploadProgress === 100;

  return (
    <section className="mx-auto w-full max-w-5xl rounded-[32px] border border-[#E5E5E5] bg-white p-6 shadow-xl shadow-slate-200/30">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#8B0000]">Film Upload Portal</p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">Submit your student film</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Upload your project safely and submit it for faculty review with AI screening and status tracking.
          </p>
        </div>
        <div className="rounded-full bg-white px-4 py-3 text-sm text-[#8B0000] shadow-sm border border-[#8B0000]/20 font-semibold">
          Official UB Light Mode experience
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Film Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your film title"
                className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20"
              />
            </div>

            <div className="space-y-2">
              <GenreFilter 
                selectedGenre={formData.category}
                onGenreChange={(value) => handleInputChange({
                  target: { name: "category", value, type: "text" }
                })}
                isSelect={true}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700">
                Short Synopsis
              </label>
              <textarea
                id="synopsis"
                name="synopsis"
                rows={5}
                value={formData.synopsis}
                onChange={handleInputChange}
                placeholder="Write a concise summary of your film"
                className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20"
              />
            </div>

            <label className="inline-flex items-center gap-3 rounded-3xl border border-gray-200 bg-white px-5 py-4">
              <input
                type="checkbox"
                name="certified"
                checked={formData.certified}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-[#8B0000] focus:ring-[#8B0000]"
              />
              <span className="text-sm text-gray-700">
                I certify this is my original work and follows UB Intellectual Property guidelines.
              </span>
            </label>
          </div>

          <div className="space-y-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`group flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[24px] border-2 border-dashed px-5 text-center transition ${
                isDragging ? "border-[#8B0000] bg-[#8B0000]/5" : "border-gray-300 bg-white"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className={`h-10 w-10 ${isDragging ? "text-[#8B0000]" : "text-gray-400"}`} />
              <div>
                <p className="text-lg font-semibold text-gray-900">Drag & drop your film file</p>
                <p className="text-sm text-gray-500">or click to browse from your device</p>
              </div>
              {selectedFile ? (
                <p className="text-sm text-[#8B0000]">Selected: {selectedFile.name}</p>
              ) : (
                <p className="text-sm text-gray-500">Accepted formats: MP4, MOV, MKV</p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#8B0000] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-3xl border border-[#8B0000]/20 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8B0000] text-white">
                  •
                </span>
                <div>
                  <p className="font-medium text-gray-900">AI Initial Scan</p>
                  <p>Checking for quality and copyright standards...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[28px] border border-[#8B0000]/20 bg-white p-6 text-sm text-gray-700 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-gray-900">Upload instructions</p>
            <p>Complete all fields and wait for the upload to finish before submitting.</p>
          </div>

          <button
            type="submit"
            disabled={!isFormComplete}
            className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${
              isFormComplete
                ? "bg-[#8B0000] text-white shadow-lg shadow-[#8B0000]/30 hover:bg-[#A00000]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Submit for Review
          </button>
        </div>

        {isSubmitted && (
          <div className="flex items-center gap-4 rounded-[28px] border border-[#8B0000]/20 bg-white px-6 py-5 text-gray-900 shadow-sm">
            <CheckCircle className="h-8 w-8 text-[#8B0000]" />
            <div>
              <p className="font-semibold">Film submitted for Faculty Review.</p>
              <p className="text-sm text-gray-700">Track status in your portfolio.</p>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
