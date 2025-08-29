const ATS = ({
  score,
  tips,
}: {
  score: number;
  tips: { type: "good" | "improve"; tip: string }[];
}) => {
  // Determine background gradient based on score
  const bgGradient =
    score > 69
      ? "from-[#064e3b] to-[#0f172a]" // green (emerald-900) to dark
      : score > 49
        ? "from-[#78350f] to-[#1f2937]" // amber-900 to dark
        : "from-[#7f1d1d] to-[#111827]"; // red-900 to dark

  return (
    <div
      className={`rounded-2xl shadow-md w-full p-8 flex flex-col gap-4 bg-gradient-to-b ${bgGradient}`}
    >
      {/* Score Header */}
      <div className="flex flex-row gap-4 items-center">
        <img
          src={
            score > 69
              ? "/icons/ats-good.svg"
              : score > 49
                ? "/icons/ats-warning.svg"
                : "/icons/ats-bad.svg"
          }
          alt="ATS"
          className="w-10 h-10"
        />
        <p className="text-2xl font-semibold text-white">
          ATS Score - {score}/100
        </p>
      </div>

      {/* Tips Section */}
      <div className="flex flex-col gap-3">
        <p className="font-medium text-xl text-white">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-lg text-gray-300">
          Your resume was scanned like an employer would. Here's how it
          performed:
        </p>

        {tips.map((suggestion, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt="tip-icon"
              className="w-4 h-4"
            />
            <p className="text-gray-300 text-base">{suggestion.tip}</p>
          </div>
        ))}

        <p className="text-lg text-gray-300">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
