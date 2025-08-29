import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3b82f6" /> {/* Blue-500 */}
              <stop offset="100%" stopColor="#0ea5e9" /> {/* Sky-400 */}
            </linearGradient>
          </defs>

          {/* Background arc (dark mode compatible) */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#334155" // slate-700 for dark background
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Foreground arc (blue gradient) */}
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
          />
        </svg>

        {/* Score label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="text-white text-xl font-semibold pt-4">
            {score}/100
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
