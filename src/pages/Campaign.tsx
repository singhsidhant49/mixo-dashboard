import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  Clock,
  Zap,
  MoreVertical,
  Target,
  MousePointer2,
  Eye,
  DollarSign,
  TrendingUp,
  BarChart2
} from "lucide-react";
import { getCampaignInsights, getCampaignById } from "../api/campaigns";
import ErrorState from "../components/ErrorState";
import StatusPill from "../components/StatusPill";
import Skeleton from "../components/Skeleton";
import { useCampaignStream } from "../hooks/useCampaignStream";

interface DetailCardProps {
  label: string;
  value: string | undefined;
  icon: React.ElementType;
  colorClass: string;
  loading: boolean;
}

const DetailCard = ({ label, value, icon: Icon, colorClass, loading }: DetailCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-sm font-medium text-slate-500">{label}</span>
    </div>
    {loading ? (
      <Skeleton height={28} width={100} />
    ) : (
      <div className="text-2xl font-bold text-slate-900">{value}</div>
    )}
  </div>
);

export default function CampaignPage() {
  const { id } = useParams<{ id: string }>();
  const campaignId = id ?? "";

  const campaignQ = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: () => getCampaignById(campaignId),
    enabled: !!campaignId,
  });

  const insightsQ = useQuery({
    queryKey: ["insights", "campaign", campaignId],
    queryFn: () => getCampaignInsights(campaignId),
    enabled: !!campaignId,
    refetchInterval: 60_000,
  });

  // Live updates via SSE
  useCampaignStream(campaignId);

  if (campaignQ.isError) return <ErrorState title="Campaign details failed" error={campaignQ.error} />;
  if (insightsQ.isError) return <ErrorState title="Campaign insights failed" error={insightsQ.error} />;

  const campaign = campaignQ.data?.campaign;
  const insights = insightsQ.data?.insights;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

   

        <div className="flex items-center gap-3">
               <div className=" flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Live Updates Enabled
        </div>

          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>

        </div>


      </div>

      {/* Header Info */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BarChart2 className="w-32 h-32 text-brand-600" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {campaign && <StatusPill status={campaign.status} />}
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                <Zap className="w-3 h-3 fill-emerald-500" />
                LIVE
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {campaign?.name || <Skeleton height={32} width={300} />}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-semibold text-slate-400">ID:</span>
                  <span className="font-mono">{campaignId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-semibold text-slate-400">Brand:</span>
                  <span>{campaign?.brand_id}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>Created {campaign ? new Date(campaign.created_at).toLocaleDateString() : '...'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Budget</p>
              <p className="text-2xl font-black text-slate-900">${campaign?.budget.toLocaleString() || '0'}</p>
            </div>
            <div className="w-[1px] bg-slate-200 h-10 self-center"></div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Daily</p>
              <p className="text-2xl font-black text-slate-900">${campaign?.daily_budget.toLocaleString() || '0'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DetailCard
          label="Impressions"
          value={insights?.impressions.toLocaleString()}
          icon={Eye}
          colorClass="bg-blue-50 text-blue-600"
          loading={insightsQ.isLoading}
        />
        <DetailCard
          label="Clicks"
          value={insights?.clicks.toLocaleString()}
          icon={MousePointer2}
          colorClass="bg-brand-50 text-brand-600"
          loading={insightsQ.isLoading}
        />
        <DetailCard
          label="Conversions"
          value={insights?.conversions.toLocaleString()}
          icon={Target}
          colorClass="bg-emerald-50 text-emerald-600"
          loading={insightsQ.isLoading}
        />
        <DetailCard
          label="Total Spend"
          value={insights ? `$${insights.spend.toLocaleString()}` : undefined}
          icon={DollarSign}
          colorClass="bg-amber-50 text-amber-600"
          loading={insightsQ.isLoading}
        />
      </div>

      {/* Ratios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl text-white flex justify-between items-center group">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">CTR</p>
            <h4 className="text-2xl font-bold">{insights?.ctr}%</h4>
          </div>
          <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
            <TrendingUp className="w-6 h-6 text-brand-400" />
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl text-white flex justify-between items-center group">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">CPC</p>
            <h4 className="text-2xl font-bold">${insights?.cpc}</h4>
          </div>
          <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
            <DollarSign className="w-6 h-6 text-amber-400" />
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl text-white flex justify-between items-center group">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Conv. Rate</p>
            <h4 className="text-2xl font-bold">{insights?.conversion_rate}%</h4>
          </div>
          <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
            <Target className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Footer Timestamp */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <Clock className="w-3 h-3" />
        Last updated: {insights ? new Date(insights.timestamp).toLocaleString() : '...'}
      </div>
    </div>
  );
}
