export type OutageType =
  | "Power_Outage"
  | "Voltage_Fluctuation"
  | "Planned_Maintenance";
export type OutageStatus = "In_Progress" | "Resolved" | "Planned";

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
