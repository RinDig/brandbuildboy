interface ArrowCornerProps {
  size?: number;
  color?: string;
  mirror?: boolean;
}

export function ArrowCorner({
  size = 30,
  color = "#D8BFC0",
  mirror = false,
}: ArrowCornerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: mirror ? "scaleX(-1)" : undefined }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.0685997 29.9314L0 30V0H30L29.9314 0.0686232C13.9175 1.11155 1.1115 13.9175 0.0685997 29.9314Z"
        fill={color}
      />
    </svg>
  );
}
