import { api } from "./client";
import type {
  CampaignListResponse,
  AggregateInsightsResponse,
  CampaignInsightsResponse,
  Campaign,
} from "./types";

export async function getCampaigns() {
  const { data } = await api.get<CampaignListResponse>("/campaigns");
  return data;
}

export async function getAggregateInsights() {
  const { data } = await api.get<AggregateInsightsResponse>("/campaigns/insights");
  return data;
}

export async function getCampaignById(id: string) {
  const { data } = await api.get<{ campaign: Campaign }>(`/campaigns/${id}`);
  return data;
}

export async function getCampaignInsights(id: string) {
  const { data } = await api.get<CampaignInsightsResponse>(`/campaigns/${id}/insights`);
  return data;
}
