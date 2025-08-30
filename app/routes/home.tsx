import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate, Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyzer" },
    {
      name: "description",
      content: "Analyze your resume with our AI-powered tool!",
    },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [userResumes, setUserResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=");
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const fetchUserResumes = async () => {
      if (!auth.isAuthenticated) return;

      setIsLoading(true);
      try {
        // Get all keys with prefix "resume:"
        const allKeys = await kv.list("");
        const resumeKeys =
          allKeys?.filter((item) =>
            typeof item === "string"
              ? item.startsWith("resume:")
              : item.key.startsWith("resume:")
          ) || [];

        const resumes = [];
        for (const keyItem of resumeKeys) {
          const key = typeof keyItem === "string" ? keyItem : keyItem.key;
          const resumeData = await kv.get(key);
          if (resumeData) {
            const parsedResume = JSON.parse(resumeData);
            resumes.push(parsedResume);
          }
        }

        setUserResumes(resumes);
      } catch (error) {
        console.error("Error fetching user resumes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserResumes();
  }, [auth.isAuthenticated, kv]);

  return (
    <main className="bg-[url('/images/bg-dark-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Welcome to the AI Resume Analyzer</h1>
          <h2>Review your submissions with our AI-powered tool!</h2>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-white">Loading your resumes...</p>
          </div>
        ) : userResumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 rounded-3xl p-12 max-w-md">
              <h2 className="text-2xl text-white mb-4 font-semibold">
                No Resumes Yet
              </h2>
              <p className="text-white/80 mb-6">
                Upload your first resume to get AI-powered analysis and feedback
              </p>
              <Link
                to="/upload"
                className="primary-button inline-block px-8 py-3"
              >
                Upload Resume
              </Link>
            </div>
          </div>
        ) : (
          <section className="w-full">
            {/* Full Width Grid Layout */}
            <div className="w-full px-4 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center max-w-none">
                {userResumes.map((resume) => (
                  <div key={resume.id} className="w-full max-w-[350px]">
                    <ResumeCard resume={resume} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
