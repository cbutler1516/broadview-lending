"use client";

import type { EquityStrategy, LeadFunnelData } from "@/lib/heloc-engine/types";

type PartialSaveInput = {
  data: LeadFunnelData;
  step: number;
  journey: string;
  equityStrategy: EquityStrategy;
  submitted: boolean;
  sourceUrl?: string;
  queryParams?: Record<string, string>;
  utm?: Record<string, string>;
};

/**
 * Broadview does not expose a partial-lead persistence endpoint and the platform
 * contract must not be modified. The funnel keeps its in-UI progress psychology;
 * server-side partial persistence is intentionally a no-op here.
 */
export function usePartialLeadSave(_input: PartialSaveInput): void {
  void _input;
}
