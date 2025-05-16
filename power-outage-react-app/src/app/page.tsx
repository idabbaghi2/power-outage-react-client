"use client";

import { useState } from "react";
import Image from "next/image";
import PowerOutageList from "../components/PowerOutageList";

export default function Home() {
    const [outageType, setOutageType] = useState("All");

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOutageType(e.target.value);
    };

    return (
        <div className="grid min-h-screen p-8 pb-20 gap-8 font-[family-name:var(--font-geist-sans)]">
            <header className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                    <Image
                        src="/stromausfall.jpg"
                        alt="strom.js logo"
                        width={250}
                        height={70}
                        priority
                    />
                </div>
                <p>
                    <span className="text-xl font-bold">Power Outage Tracker</span>
                </p>
                <p className="mt-2 text-gray-500">
                    Real-time tracking of power outages from grid operators
                </p>
            </header>

            {/* Dropdown Filter */}
            <div className="flex justify-center">
                <label htmlFor="outageType" className="mr-2 font-medium">Filter Outage Type:</label>
                <select
                    id="outageType"
                    value={outageType}
                    onChange={handleFilterChange}
                    className="border rounded px-2 py-1"
                >
                    <option value="All">All</option>
                    <option value="Power Outage">Power Outage</option>
                    <option value="Voltage Fluctuation">Voltage Fluctuation</option>
                    <option value="Planned Maintenance">Planned Maintenance</option>
                </select>
            </div>

            <main className="container mx-auto max-w-6xl">
                <PowerOutageList outageType={outageType} />
            </main>

            <footer className="flex gap-[24px] flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://data-hackdays-be.ch/anmeldung/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Bern Datahackdays 2024
                </a>
            </footer>
        </div>
    );
}
