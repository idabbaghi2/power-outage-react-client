import { api } from "./api";
import { PowerOutageReport } from "../types/powerOutage";

export const powerOutageService = {
  getAll: () => api.get<PowerOutageReport[]>("/poweroutage"),

  getById: (id: string) => api.get<PowerOutageReport>(`/poweroutage/${id}`),

  create: (outage: Omit<PowerOutageReport, "id">) =>
    api.post<PowerOutageReport>("/poweroutage", outage),
};
