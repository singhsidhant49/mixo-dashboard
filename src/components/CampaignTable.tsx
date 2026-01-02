import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  ArrowRight,
} from "lucide-react";
import type { Campaign, CampaignStatus } from "../api/types";
import StatusPill from "./StatusPill";
import Skeleton from "./Skeleton";

type Props = {
  campaigns: Campaign[];
  loading?: boolean;
};

type SortKey = "created_at" | "budget" | "daily_budget" | "name";

function parseDate(s: string) {
  const t = Date.parse(s);
  return Number.isFinite(t) ? t : 0;
}

export default function CampaignTable({ campaigns, loading }: Props) {
  const nav = useNavigate();

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<CampaignStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let rows = campaigns.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query) ||
        c.brand_id.toLowerCase().includes(query);

      const matchesStatus = status === "all" ? true : c.status === status;

      return matchesQuery && matchesStatus;
    });

    rows = rows.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;

      const va =
        sortKey === "created_at"
          ? parseDate(a.created_at)
          : sortKey === "name"
            ? a.name.toLowerCase()
            : a[sortKey];

      const vb =
        sortKey === "created_at"
          ? parseDate(b.created_at)
          : sortKey === "name"
            ? b.name.toLowerCase()
            : b[sortKey];

      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });

    return rows;
  }, [campaigns, q, status, sortKey, sortDir]);

  const headerCell = (key: SortKey, label: string) => {
    const active = sortKey === key;
    return (
      <th
        className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors group"
        onClick={() => {
          if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
          else {
            setSortKey(key);
            setSortDir(key === "name" ? "asc" : "desc");
          }
        }}
      >
        <div className="flex items-center gap-2">
          {label}
          <div className={`transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}>
            {active && sortDir === "asc" ? (
              <ChevronUp className="w-4 h-4 text-brand-600" />
            ) : (
              <ChevronDown className={`w-4 h-4 ${active ? "text-brand-600" : "text-slate-400"}`} />
            )}
          </div>
        </div>
      </th>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search campaigns, brands, or IDs..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CampaignStatus | "all")}
              className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all shadow-sm appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              {headerCell("name", "Campaign")}
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Platforms</th>
              {headerCell("budget", "Budget")}
              {headerCell("daily_budget", "Daily")}
              {headerCell("created_at", "Created")}
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4"><Skeleton height={14} width={200} /></td>
                  <td className="px-6 py-4"><Skeleton height={14} width={80} /></td>
                  <td className="px-6 py-4"><Skeleton height={14} width={120} /></td>
                  <td className="px-6 py-4"><Skeleton height={14} width={80} /></td>
                  <td className="px-6 py-4"><Skeleton height={14} width={60} /></td>
                  <td className="px-6 py-4"><Skeleton height={14} width={100} /></td>
                  <td className="px-6 py-4"></td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500 italic">
                  No campaigns found matching your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => nav(`/campaigns/${c.id}`)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {c.name}
                      </span>
                      <span className="text-xs text-slate-400 mt-0.5">
                        {c.id} · {c.brand_id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={c.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {c.platforms.map((p) => (
                        <span key={p} className="text-[10px] font-bold uppercase tracking-tight bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    ${c.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    ${c.daily_budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(c.created_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="p-2 text-slate-300 group-hover:text-brand-500 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <p className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of <span className="font-semibold">{campaigns.length}</span> campaigns
        </p>
      </div>
    </div>
  );
}