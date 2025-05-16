export type OutageType =
  | "Power Outage"
  | "Voltage Fluctuation"
  | "Planned Maintenance";
export type OutageStatus = "In Progress" | "Resolved" | "Planned";

export interface AffectedArea {
  name: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface PowerOutageReport {
  id?: string;
  grid_operator: string;
  outage_type: OutageType;
  description?: string;
  start_time: string;
  estimated_end?: string;
  status: OutageStatus;
  affected_areas: AffectedArea[];
  affected_customers?: number;
  report_source?: string;
  last_update?: string;
}
