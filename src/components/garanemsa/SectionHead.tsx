import { Divider } from "./decor";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  body?: string;
  id: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
}

export function SectionHead({
  eyebrow,
  title,
  body,
  id,
  tone = "dark",
  align = "start",
}: SectionHeadProps) {
  const light = tone === "light";

  return (
    <div
      className={`gr-section-head${
        align === "center" ? " gr-section-head--center" : ""
      }`}
      data-reveal
    >
      <p className={`gr-eyebrow${light ? " gr-eyebrow--light" : ""}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`gr-h2${light ? " gr-h2--light" : ""}`}
      >
        {title}
      </h2>
      <Divider className={light ? "gr-divider--light" : undefined} />
      {body ? (
        <p className={`gr-lead${light ? " gr-lead--light" : ""}`}>{body}</p>
      ) : null}
    </div>
  );
}
