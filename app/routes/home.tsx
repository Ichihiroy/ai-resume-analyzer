import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "constans";
import ResumeCard from "~/components/ResumeCard";

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
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Welcome to the AI Resume Analyzer</h1>
          <h2>Review your submissions with our AI-powered tool!</h2>
        </div>
        <section className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </section>
      </section>
    </main>
  );
}
