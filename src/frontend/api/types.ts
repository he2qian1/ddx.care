import type { ProgressEvent } from "../../backend/progress-store";

export type { ProgressEvent } from "../../backend/progress-store";
import type {
  DiagnosisReport,
  ReportOutcome,
} from "../../shared/report-outcome";

export type {
  AvailableReportOutcome,
  DiagnosisReport,
  ReportOutcome,
} from "../../shared/report-outcome";

export interface DiagnoseRequest {
  medicalHistory: string;
  conversationTranscript: string;
  labResults: string;
}

export interface DiagnoseResponse {
  jobId: string;
  status: "pending";
  token: string;
  wsTicket: string;
}

export type Diagnosis = DiagnosisReport["diagnoses"][number];

export type ToolStatus = "running" | "success" | "partial" | "error";

export interface ToolHistoryEntry {
  toolCallId?: string;
  toolName: string;
  toolArgs: string | null;
  status: ToolStatus;
  durationMs?: number;
  resultSummary?: string | null;
}

export interface StatusResponse {
  jobId: string;
  status: "pending" | "completed" | "failed";
  progress?: ProgressEvent[];
  result?: ReportOutcome;
  error?: string;
}

export interface AgentInfo {
  id: string;
  name: string;
  description: string;
}

export interface AgentsResponse {
  agents: AgentInfo[];
}

export type WsMessage =
  | {
      type: "progress";
      jobId: string;
      event: ProgressEvent;
    }
  | {
      type: "completed";
      jobId: string;
      result: ReportOutcome;
    }
  | { type: "failed"; jobId: string; error: string };
