function Paper({
  children,
  width = "100%",
  maxWidth = "auto",
  padding = "10px",
  backgroundColor = "var(--base-white)",
  minWidth = "auto",
  borderRadius="none",
  height="auto",
  maxHeight="auto",
  minHeight="auto",
  className,
}) {
  const customStyle = {
    width,
    maxWidth,
    padding,
    backgroundColor,
    minWidth,
    borderRadius,
    minHeight,
    maxHeight,
    height
  };
  return (
    <div className={className} style={customStyle}>
      {children}
    </div>
  );
}

export default Paper;
