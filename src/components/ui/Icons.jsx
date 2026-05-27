function IconBase({ children, className = 'h-4 w-4', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function AlertTriangleIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m10.3 4.8-7.4 12.8A1.7 1.7 0 0 0 4.4 20h15.2a1.7 1.7 0 0 0 1.5-2.4L13.7 4.8a1.9 1.9 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </IconBase>
  );
}

export function RotateCcwIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </IconBase>
  );
}

export function ChevronDownIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function ChevronUpIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m18 15-6-6-6 6" />
    </IconBase>
  );
}

export function SparklesIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
      <path d="m5 3 1 2" />
      <path d="m18 5 1 2" />
      <path d="m3 12 2-1" />
      <path d="m19 13 2 1" />
    </IconBase>
  );
}

export function ShieldIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3 19 6v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6l7-3Z" />
    </IconBase>
  );
}

export function CoinsIcon(props) {
  return (
    <IconBase {...props}>
      <ellipse cx="8" cy="8" rx="5" ry="3" />
      <path d="M3 8v5c0 1.7 2.2 3 5 3s5-1.3 5-3V8" />
      <path d="M13 11c0 1.7 2.2 3 5 3s5-1.3 5-3V8" />
      <ellipse cx="13" cy="8" rx="5" ry="3" />
    </IconBase>
  );
}

export function TrendingUpIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m4 14 6-6 4 4 6-6" />
      <path d="M14 6h6v6" />
    </IconBase>
  );
}

export function TrendingDownIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m4 10 6 6 4-4 6 6" />
      <path d="M14 16h6v-6" />
    </IconBase>
  );
}

export function LineChartIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 19h16" />
      <path d="m6 15 4-4 3 3 5-7" />
    </IconBase>
  );
}
