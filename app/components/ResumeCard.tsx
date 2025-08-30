import { Link } from "react-router";
import { useState, useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { CircleAlert } from "lucide-react";

interface ResumeCardProps {
  resume: Resume;
}

const ResumeCard = ({ resume }: ResumeCardProps) => {
  const { fs } = usePuterStore();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadResumeImage = async () => {
      console.log("Loading resume image for:", resume.id);
      console.log("ImagePath:", resume.imagePath);

      if (!resume.imagePath) {
        console.log("No imagePath available");
        setImageLoading(false);
        setImageError(true);
        return;
      }

      try {
        setImageLoading(true);
        setImageError(false);

        // Read the image blob from Puter filesystem using the same method as resume route
        const imageBlob = await fs.read(resume.imagePath);

        if (!imageBlob) {
          console.log("Failed to read image blob from path:", resume.imagePath);
          setImageError(true);
          return;
        }

        console.log("Image blob loaded, size:", imageBlob.size);

        // Create object URL from the blob
        const imageUrl = URL.createObjectURL(new Blob([imageBlob]));
        console.log("Image URL created:", imageUrl);

        setPreviewImage(imageUrl);
      } catch (error) {
        console.error("Failed to load resume image:", error);
        setImageError(true);
      } finally {
        setImageLoading(false);
      }
    };

    loadResumeImage();

    // Cleanup function to revoke object URL
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [resume.imagePath, fs]);

  const score = resume.feedback?.overallScore ?? 0;

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80)
      return "bg-green-500/15 border-green-500/30 text-green-400";
    if (score >= 60)
      return "bg-yellow-500/15 border-yellow-500/30 text-yellow-400";
    return "bg-red-500/15 border-red-500/30 text-red-400";
  };

  return (
    <div className="w-full max-w-sm">
      <Link to={`/resume/${resume.id}`} className="group block w-full h-full">
        <div className="bg-white/8 hover:bg-white/12 backdrop-blur-sm border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/10 transform hover:-translate-y-1">
          {/* Resume Preview */}
          <div className="relative aspect-[4/5] bg-gray-900/20 overflow-hidden">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-6 h-6 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin" />
              </div>
            )}

            {imageError || !previewImage ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200">
                <svg
                  className="w-12 h-12 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-xs text-center px-3 font-medium">
                  Preview Not Available
                </p>
                <p className="text-xs text-gray-500 mt-1 text-center px-2">
                  Path:{" "}
                  {resume.imagePath
                    ? resume.imagePath.substring(0, 30) + "..."
                    : "No path"}
                </p>
              </div>
            ) : (
              <img
                src={previewImage}
                alt={`${resume.companyName || "Resume"} preview`}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            )}

            {/* Score Badge */}
            <div className="absolute top-3 right-3">
              <div
                className={`px-3 py-1 rounded-full text-sm font-semibold border backdrop-blur-sm ${getScoreBadgeColor(score)}`}
              >
                {score}
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="px-4 py-2 bg-white text-gray-900 rounded-xl font-medium text-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                View Analysis
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5">
            <div className="mb-3">
              <h3 className="font-semibold text-white text-lg leading-tight mb-1 truncate group-hover:text-blue-300 transition-colors">
                {resume.companyName || "Resume Analysis"}
              </h3>
              <p className="text-gray-400 text-sm truncate">
                {resume.jobTitle || "Professional Resume"}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {score >= 80 ? (
                  <div className="flex items-center gap-1 text-green-400">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Optimized</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <CircleAlert size={15} />
                    <span>Needs Work</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ResumeCard;
