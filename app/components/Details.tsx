import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "../components/Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={`flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px] ${
        score > 69
          ? "bg-badge-green"
          : score > 39
            ? "bg-badge-yellow"
            : "bg-badge-red"
      }`}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4"
      />
      <p
        className={`text-sm font-medium ${
          score > 69
            ? "text-badge-green-text"
            : score > 39
              ? "text-badge-yellow-text"
              : "text-badge-red-text"
        }`}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold text-white">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {/* Tips Summary Grid */}
      <div className="bg-slate-800 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="tip"
              className="size-5"
            />
            <p className="text-lg text-gray-300">{tip.tip}</p>
          </div>
        ))}
      </div>

      {/* Tips with Explanation */}
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={`flex flex-col gap-2 rounded-2xl p-4 border ${
              tip.type === "good"
                ? "bg-emerald-900 border-emerald-700 text-emerald-300"
                : "bg-yellow-900 border-yellow-700 text-yellow-300"
            }`}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="score"
                className="size-5"
              />
              <p className="text-xl font-semibold">{tip.tip}</p>
            </div>
            <p>{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
