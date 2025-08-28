import { useState, type FormEvent } from "react";
import Navbar from "~/components/Navbar";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatusText("Processing your resume...");
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
                className="w-full"
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
                <div>Uploader</div>
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
