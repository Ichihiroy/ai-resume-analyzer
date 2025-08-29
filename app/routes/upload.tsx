import { useState, type FormEvent } from "react";
import { convertPdfToImage } from "utils/pdfToImg";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { nanoid } from "nanoid";
import { prepareInstructions } from "constans";
import { AIResponseFormat } from "constans";

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
  const [isProcessing, setIsProcessing] = useState(false);
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

    handleAnalyze(companyName, jobTitle, jobDescription);
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async (
    companyName: string,
    jobTitle: string,
    jobDescription: string
  ) => {
    setIsProcessing(true);
    setStatusText("Uploading your resume...");

    const uploadedFile = await fs.upload(file ? [file] : []);
    if (!uploadedFile) {
      setStatusText("Please select a resume file to upload.");
      // setIsProcessing(false);
      return;
    }

    setStatusText("Converting PDF to image...");
    const imageFile = await convertPdfToImage(file as File);
    if (!imageFile.file) {
      setStatusText("Failed to convert PDF to image.");
      // setIsProcessing(false);
      return;
    }

    setStatusText("Uploading image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) {
      setStatusText("Failed to upload image.");
      // setIsProcessing(false);
      return;
    }

    setStatusText("Preparing data...");

    const data = {
      id: nanoid(),
      companyName,
      jobTitle,
      jobDescription,
      imagePath: uploadedImage.path,
      resumePath: uploadedFile.path,
      feedback: "",
    };

    await kv.set("resume" + data.id, JSON.stringify(data));
    setStatusText("Analyzing resume...");

    const feedback = await ai.feedback(
      data.resumePath,
      prepareInstructions({
        jobTitle,
        jobDescription,
        AIResponseFormat,
      })
    );

    if (!feedback) {
      setStatusText("Failed to analyze resume.");
      // setIsProcessing(false);
      return;
    }

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0]?.text || "No feedback received.";

    data.feedback = JSON.parse(feedbackText);
    await kv.set("resume" + data.id, JSON.stringify(data));

    setStatusText("Analysis complete! Redirecting...");
    setIsProcessing(false);

    console.log(data);
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
              <button
                onSubmit={handleSubmit}
                className="primary-button py-4"
                type="submit"
              >
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
