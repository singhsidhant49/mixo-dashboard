import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../api/client";
import type { CampaignInsightsResponse, CampaignInsights } from "../api/types";

export function useCampaignStream(campaignId: string) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!campaignId) return;

    const url = `${API_BASE_URL}/campaigns/${campaignId}/insights/stream`;
    const es = new EventSource(url);

    es.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data) as CampaignInsights;
        const next: CampaignInsightsResponse = { insights: parsed };

        // Update the same query  page uses:
        qc.setQueryData(["insights", "campaign", campaignId], next);
      } catch {
        // ignore malformed messages
      }
    };

    es.onerror = () => {
     // es.close();
    };

    return () => es.close();
  }, [campaignId, qc]);
}
