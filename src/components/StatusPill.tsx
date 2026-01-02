import type { CampaignStatus } from "../api/types";

export default function StatusPill({ status }: { status: CampaignStatus }) {
  let classes = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ";

  if (status === "active") {
    classes += "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (status === "paused") {
    classes += "bg-amber-50 text-amber-700 border-amber-200";
  } else if (status === "completed") {
    classes += "bg-blue-50 text-blue-700 border-blue-200";
  } else {
    classes += "bg-slate-50 text-slate-700 border-slate-200";
  }

  return (
    <span className={classes}>
      {status === "active" && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
      )}
      <span className="capitalize">{status}</span>
    </span>
  );
}
