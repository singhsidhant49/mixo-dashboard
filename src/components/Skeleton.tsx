type SkeletonProps = {
  height?: number | string;
  width?: number | string;
  className?: string;
};

export default function Skeleton({ height = 14, width = "100%", className = "" }: SkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={`bg-slate-200 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-shimmer rounded-lg ${className}`}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
    />
  );
}
