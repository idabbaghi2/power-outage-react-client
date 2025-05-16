"use client";

import { useState, useEffect } from "react";
import { PowerOutageReport } from "../types/powerOutage";
import { powerOutageService } from "../services/powerOutageService";

interface PowerOutageListProps {
  outageType: string;
}

export default function PowerOutageList({ outageType }: PowerOutageListProps) {
  const [outages, setOutages] = useState<PowerOutageReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOutages() {
      try {
        setLoading(true);
        const data = await powerOutageService.getAll();
        setOutages(data);
      } catch (err) {
        setError(
            err instanceof Error ? err.message : "Failed to fetch outages"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOutages();
  }, []);

  const filteredOutages =
      outageType === "All"
          ? outages
          : outages.filter((outage) => outage.outage_type === outageType);

  if (loading) return <div className="p-4">Loading power outage data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Current Power Outages</h2>
        {filteredOutages.length === 0 ? (
            <p>No power outages reported for selected type</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOutages.map((outage) => (
                  <div
                      key={outage.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="font-semibold">{outage.grid_operator}</div>
                    <div className="text-sm">
                <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                        outage.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : outage.status === "Planned"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                    }`}
                >
                  {outage.status}
                </span>
                      <span className="ml-2">{outage.outage_type}</span>
                    </div>
                    <div className="mt-2">
                      <div>
                        Started: {new Date(outage.start_time).toLocaleString()}
                      </div>
                      {outage.estimated_end && (
                          <div>
                            Est. End: {new Date(outage.estimated_end).toLocaleString()}
                          </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <strong>Affected Areas:</strong>
                      <ul className="list-disc pl-5">
                        {outage.affected_areas.map((area, idx) => (
                            <li key={idx}>{area.name}</li>
                        ))}
                      </ul>
                    </div>
                    {outage.affected_customers && (
                        <div>
                          Affected Customers:{" "}
                          {outage.affected_customers.toLocaleString()}
                        </div>
                    )}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}
