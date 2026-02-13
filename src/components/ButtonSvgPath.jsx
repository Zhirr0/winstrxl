
const ButtonSvgPath = () => {
  const pathData = `
      M0.848677 0
      H0.152070
      C0.037037 0 0.082010 1 0 1
      H0.997354
      C0.915343 1 0.962963 0 0.848677 0
      Z
    `;
  return (
    <svg width="0" height="0" viewBox="0 0 1 1" aria-hidden="true">
      <defs>
        <clipPath id="button-container" clipPathUnits="objectBoundingBox">
          <path d={pathData.trim()} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ButtonSvgPath;
