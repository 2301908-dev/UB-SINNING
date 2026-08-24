import { useEffect, useRef, useState } from "react";
import { Upload, CheckCircle, ImagePlus } from "lucide-react";
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
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPosterDragging, setIsPosterDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const posterInputRef = useRef(null);

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

  useEffect(() => {
    if (!posterFile) {
      setPosterPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(posterFile);
    setPosterPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [posterFile]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUploadProgress(0);
    setIsSubmitted(false);
    setIsDragging(false);
  };

  const handlePosterSelect = (file) => {
    setPosterFile(file);
    setIsSubmitted(false);
    setIsPosterDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    setIsDragging(false);
  };

  const handlePosterDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handlePosterSelect(file);
    }
    setIsPosterDragging(false);
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
      window.dispatchEvent(
        new CustomEvent("ub-sining:film-submitted", {
          detail: {
            film: {
              id: `uploaded-${Date.now()}`,
              title: formData.title.trim(),
              creator: "You",
              category: formData.category,
              tags: ["Pending Approval"],
              thumbnail: posterPreview,
              previewUrl: URL.createObjectURL(selectedFile),
              duration: "Processing",
              views: 0,
              rating: 0,
              status: "pending",
              isAwaitingApproval: true,
              aiScreening: "processing",
              description: formData.synopsis.trim(),
            },
          },
        })
      );
      setIsSubmitted(true);
    }
  };

  const isFormComplete =
    formData.title.trim() &&
    formData.category.trim() &&
    formData.synopsis.trim() &&
    formData.certified &&
    posterFile &&
    selectedFile &&
    uploadProgress === 100;

  return (
    <section className="mx-auto w-full max-w-5xl rounded-[32px] border border-white/10 bg-[#171315] p-6 text-white shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#D4AF37]">Film Upload Portal</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Submit your student film</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Upload your project safely and submit it for faculty review with AI screening and status tracking.
          </p>
        </div>
        <div className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black shadow-sm shadow-black/20">
          Required poster before upload
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-white/80">
                Film Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your film title"
                required
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
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
              <label htmlFor="synopsis" className="block text-sm font-medium text-white/80">
                Short Synopsis
              </label>
              <textarea
                id="synopsis"
                name="synopsis"
                rows={5}
                value={formData.synopsis}
                onChange={handleInputChange}
                placeholder="Write a concise summary of your film"
                required
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>

            <div className="space-y-3 rounded-[28px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <label className="block text-sm font-medium text-white/80">
                    Poster or Thumbnail
                  </label>
                  <p className="mt-1 text-xs text-white/45">
                    Required before upload. Use a still frame, poster, or thumbnail image.
                  </p>
                </div>
                <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
                  Required
                </span>
              </div>

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsPosterDragging(true);
                }}
                onDragLeave={() => setIsPosterDragging(false)}
                onDrop={handlePosterDrop}
                onClick={() => posterInputRef.current?.click()}
                className={`group flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[24px] border-2 border-dashed px-5 text-center transition ${
                  isPosterDragging ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/15 bg-[#120f10]"
                }`}
              >
                {posterPreview ? (
                  <div className="flex w-full max-w-[260px] flex-col items-center gap-3">
                    <img
                      src={posterPreview}
                      alt="Poster preview"
                      className="h-36 w-full rounded-2xl object-cover ring-1 ring-white/10"
                    />
                    <p className="text-sm text-white/80">{posterFile?.name}</p>
                  </div>
                ) : (
                  <>
                    <ImagePlus className={`h-10 w-10 ${isPosterDragging ? "text-[#D4AF37]" : "text-white/45"}`} />
                    <div>
                      <p className="text-lg font-semibold text-white">Add a poster or thumbnail</p>
                      <p className="text-sm text-white/50">Click or drag an image here before uploading</p>
                    </div>
                    <p className="text-sm text-white/45">Accepted formats: JPG, PNG, WEBP</p>
                  </>
                )}
                <input
                  ref={posterInputRef}
                  type="file"
                  accept="image/*"
                  required
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) handlePosterSelect(file);
                  }}
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
              <input
                type="checkbox"
                name="certified"
                checked={formData.certified}
                onChange={handleInputChange}
                required
                className="h-4 w-4 rounded border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="text-sm text-white/70">
                I certify this is my original work and follows UB Intellectual Property guidelines.
              </span>
            </label>
          </div>

          <div className="space-y-6 rounded-[28px] border border-white/10 bg-[#20191b] p-6 shadow-sm shadow-black/20">
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`group flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[24px] border-2 border-dashed px-5 text-center transition ${
                isDragging ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/15 bg-[#120f10]"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className={`h-10 w-10 ${isDragging ? "text-[#D4AF37]" : "text-white/45"}`} />
              <div>
                <p className="text-lg font-semibold text-white">Drag & drop your film file</p>
                <p className="text-sm text-white/50">or click to browse from your device</p>
              </div>
              {selectedFile ? (
                <p className="text-sm text-[#D4AF37]">Selected: {selectedFile.name}</p>
              ) : (
                <p className="text-sm text-white/45">Accepted formats: MP4, MOV, MKV</p>
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
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#D4AF37] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-3xl border border-[#D4AF37]/15 bg-white/5 px-4 py-3 text-sm text-white/70 shadow-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-sm shadow-black/20">
                  •
                </span>
                <div>
                  <p className="font-medium text-white">AI Initial Scan</p>
                  <p>Checking for quality and copyright standards...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm text-white/70 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">Upload instructions</p>
            <p>Complete all fields and wait for the upload to finish before submitting.</p>
          </div>

          <button
            type="submit"
            disabled={!isFormComplete}
            className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${
              isFormComplete
                ? "bg-[#D4AF37] text-[#120808] shadow-lg shadow-[#D4AF37]/20 hover:bg-[#e2c15b]"
                : "cursor-not-allowed bg-white/10 text-white/30"
            }`}
          >
            Submit for Review
          </button>
        </div>

        {isSubmitted && (
          <div className="flex items-center gap-4 rounded-[28px] border border-[#D4AF37]/15 bg-[#171315] px-6 py-5 text-white shadow-sm">
            <CheckCircle className="h-8 w-8 text-[#D4AF37]" />
            <div>
              <p className="font-semibold">Film submitted for Faculty Review.</p>
              <p className="text-sm text-white/65">Track status in your portfolio.</p>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
