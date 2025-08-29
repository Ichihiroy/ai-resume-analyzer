import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export function meta() {
  return [
    { title: "Resume Details" },
    {
      name: "description",
      content: "View and analyze your resume details.",
    },
  ];
}

const Resume = () => {
  const { fs, kv, auth, isLoading } = usePuterStore();
  const { id } = useParams<{ id: string }>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated && !isLoading) {
      navigate("/auth?next=/resume:" + id);
    }
  }, [auth.isAuthenticated, isLoading]);

  useEffect(() => {
    const fetchResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);

      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);

      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);

      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);

      setImageUrl(imageUrl);
      setFeedback(data.feedback || null);
    };
    fetchResume();
  }, [id]);

  console.log("Feedback:", feedback);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to={`/`} className="back-button">
          <img src="/icons/back.svg" alt="Go Back" className="w-3 h-3" />
          <span className="font-semibold text-gray-800 text-sm">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row max-lg:flex-col-reverse w-full">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-around">
          {imageUrl && resumeUrl && (
            <div className="animate-fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="PDF Image"
                  className="object-contain rounded-2xl w-full h-full"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume review</h2>
          {feedback ? (
            <div className="fade-in animate-in duration-1000 flex flex-col gap-8">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                tips={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img
              src="/images/resume-scan-2.gif"
              alt="Scanning..."
              className="object-contain rounded-2xl w-full h-full"
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
