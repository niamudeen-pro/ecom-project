export default function SectionText({
  title,
  desc,
  btnText,
  textDirection = "LEFT",
}) {
  return (
    <div
      className={`flex flex-col gap-9 ${
        textDirection === "CENTER" ? "text-center" : "text-left"
      } `}
    >
      {title && <h2>{title}</h2>}
      {desc && <p className="m-auto">{desc}</p>}
      {btnText && <button className="btn w-max">{btnText}</button>}
    </div>
  );
}
