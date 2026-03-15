import { useMediaQuery } from "react-responsive";

export default function ProcessCard({
  title,
  number,
  description,
  className = "",
  titleClassName = "",
  numebrClassName = "",
  descriptionFirstClassName = "",
  descriptionSecondClassName = "",
}) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const descriptionChildren = description?.props?.children
    ? Array.isArray(description.props.children)
      ? description.props.children
      : [description.props.children]
    : [];

  return (
    <div
      style={{ padding: isMobile ? "50px 10px 10px 10px" : "30px" }}
      className={`cl-process-card ${className}`}
    >
      <div className="cl-card-header">
        <h1 className={titleClassName}>{title}</h1>
        <h1 className={numebrClassName}>{number}</h1>
      </div>
      <div className="cl-card-center">
        <div
          className="h-0.5 w-full"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.5), transparent)",
          }}
        />
      </div>
      <div className="cl-card-bottom">
        {descriptionChildren[0] && (
          <div className={descriptionFirstClassName}>
            {descriptionChildren[0]}
          </div>
        )}
        {descriptionChildren[1] && (
          <div className={descriptionSecondClassName}>
            {descriptionChildren[1]}
          </div>
        )}
      </div>
    </div>
  );
}
