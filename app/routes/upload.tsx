import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

export function meta() {
  return [
    { title: "Resumind | Upload your resume" },
    {
      name: "description",
      content: "Upload your resume for analysis and improvement suggestions.",
    },
  ];
}

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { kv, ai, fs } = usePuterStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form || !file) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = (
    companyName: string,
    jobTitle: string,
    jobDescription: string
  ) => {
    setIsProcessing(true);
    setStatusText("Analyzing your resume...");

    // const uploadedFile = fs.uploadFile(file!);
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>
            Smart feedback <br /> for your dream job
          </h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="Processing"
                className="size-100"
              />
            </>
          ) : (
            <>
              <h2>
                Drop your resume for an ATS score and improvement suggestions.
              </h2>
            </>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  id="company-name"
                  name="company-name"
                  placeholder="e.g., Google"
                  required
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  id="job-title"
                  name="job-title"
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  id="job-description"
                  name="job-description"
                  placeholder="e.g., Develop and maintain web applications"
                  required
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileChange={handleFileChange} />
              </div>
              <button className="primary-button py-4" type="submit">
                Save & Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
