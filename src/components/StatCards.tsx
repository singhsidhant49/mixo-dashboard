import {
  BarChart3,
  Target,
  DollarSign,
  Eye,
  MousePointer2,
  TrendingUp,
  Percent,
  Activity
} from "lucide-react";
import type { AggregateInsights } from "../api/types";
import Skeleton from "./Skeleton";

type Props = {
  insights?: AggregateInsights;
  loading?: boolean;
};

function Card({
  label,
  value,
  hint,
  icon: Icon,
  loading,
  trend,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ElementType;
  loading?: boolean;
  trend?: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-brand-50 transition-colors">
          <Icon className="w-5 h-5 text-slate-400 group-hover:text-brand-600" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        {loading ? (
          <Skeleton height={32} width={120} />
        ) : (
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        )}
        {hint && !loading && (
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}

export default function StatCards({ insights, loading }: Props) {
  const fmtInt = (n?: number) => (n == null ? "—" : n.toLocaleString());
  const fmtMoney = (n?: number) => (n == null ? "—" : `$${n.toLocaleString()}`);
  const fmtPct = (n?: number) => (n == null ? "—" : `${n.toFixed(2)}%`);
  const fmtNum = (n?: number) => (n == null ? "—" : n.toFixed(2));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        label="Total Campaigns"
        value={fmtInt(insights?.total_campaigns)}
        icon={BarChart3}
        loading={loading}
      />
      <Card
        label="Active Campaigns"
        value={fmtInt(insights?.active_campaigns)}
        hint={`${insights?.paused_campaigns ?? 0} paused · ${insights?.completed_campaigns ?? 0} done`}
        icon={Activity}
        loading={loading}
      />
      <Card
        label="Total Spend"
        value={fmtMoney(insights?.total_spend)}
        icon={DollarSign}
        loading={loading}
        trend="+12.5%"
      />
      <Card
        label="Impressions"
        value={fmtInt(insights?.total_impressions)}
        icon={Eye}
        loading={loading}
      />
      <Card
        label="Clicks"
        value={fmtInt(insights?.total_clicks)}
        icon={MousePointer2}
        loading={loading}
      />
      <Card
        label="Conversions"
        value={fmtInt(insights?.total_conversions)}
        icon={Target}
        loading={loading}
        trend="+5.2%"
      />
      <Card
        label="Avg CTR"
        value={fmtPct(insights?.avg_ctr)}
        icon={TrendingUp}
        loading={loading}
      />
      <Card
        label="Avg CPC"
        value={loading ? "—" : `$${fmtNum(insights?.avg_cpc)}`}
        icon={Percent}
        loading={loading}
      />
    </div>
  );
}
