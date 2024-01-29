function Button({
  children,
  width = "100%",
  borderRadius = "50px",
  color = "var(--base-white)",
  fontSize = "14px",
  backgroundColor = "var(--base-blue)",
  fontWeight = 600,
  cursor = "pointer",
  height = "50px",
  border = "none",
  onClick,
  disabled
}) {
  const customStyle = {
    width,
    borderRadius,
    color,
    fontSize,
    backgroundColor,
    fontWeight,
    cursor,
    height,
    border,
    display:"flex",
    alignItems:"center",
    gap:"8px",
    justifyContent:"center"
  };
  return <button disabled={disabled} onClick={onClick} style={customStyle}>{children}</button>;
}

export default Button;
