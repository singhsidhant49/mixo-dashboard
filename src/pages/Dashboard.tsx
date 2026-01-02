import { useQuery } from "@tanstack/react-query";
import { getAggregateInsights, getCampaigns } from "../api/campaigns";
import { BarChart3, Target } from "lucide-react";
import StatCards from "../components/StatCards";
import CampaignTable from "../components/CampaignTable";
import ErrorState from "../components/ErrorState";

export default function DashboardPage() {
  const insightsQ = useQuery({
    queryKey: ["insights", "aggregate"],
    queryFn: getAggregateInsights,
    refetchInterval: 60_000, 
  });

  const campaignsQ = useQuery({
    queryKey: ["campaigns", "list"],
    queryFn: getCampaigns,
    refetchInterval: 60_000,
  });

  if (insightsQ.isError) return <ErrorState title="Insights failed" error={insightsQ.error} />;
  if (campaignsQ.isError) return <ErrorState title="Campaigns failed" error={campaignsQ.error} />;

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Campaign Monitoring
          </h1>
          <p className="text-slate-500 mt-1">
            Real-time performance analytics across all platforms.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Live Updates Enabled
        </div>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-6 text-slate-900">
          <BarChart3 className="w-5 h-5 text-brand-600" />
          <h2 className="text-lg font-bold">Performance Insights</h2>
        </div>
        <StatCards insights={insightsQ.data?.insights} loading={insightsQ.isLoading} />
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6 text-slate-900">
          <Target className="w-5 h-5 text-brand-600" />
          <h2 className="text-lg font-bold">All Campaigns</h2>
        </div>
        <CampaignTable campaigns={campaignsQ.data?.campaigns ?? []} loading={campaignsQ.isLoading} />
      </section>
    </div>
  );
}
