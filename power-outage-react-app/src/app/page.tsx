"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PowerOutageList from "../components/PowerOutageList";

export default function Home() {
    const [outageType, setOutageType] = useState("All");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOutageType(e.target.value);
    };

    const formattedDate = currentTime.toLocaleString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    return (
        <div className="relative grid min-h-screen p-8 pb-20 gap-8 font-[family-name:var(--font-geist-sans)]">
            {/* 🖼️ Small top-left image */}
            <div className="absolute top-0 left-0 m-4">
                <Image
                    src="/police.jpg" // ← Replace with your image path
                    alt="Top Left Icon"
                    width={80}
                    height={80}
                />
            </div>

            <header className="flex flex-col items-center">
                {/* Fancy Live Date Time */}
                <div className="mb-12 text-center text-sm md:text-base text-gray-600 font-mono tracking-wide">
                    {formattedDate}
                </div>

                {/* Logo */}
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
                <label htmlFor="outageType" className="mr-2 font-medium">
                    Filter Outage Type:
                </label>
                <select
                    id="outageType"
                    value={outageType}
                    onChange={handleFilterChange}
                    className="border rounded px-2 py-1"
                >
                    <option value="All">All</option>
                    <option value="Power_Outage">Power Outage</option>
                    <option value="Voltage_Fluctuation">Voltage Fluctuation</option>
                    <option value="Planned_Maintenance">Planned Maintenance</option>
                </select>
            </div>

            <main className="container mx-auto max-w-6xl">
                <PowerOutageList outageType={outageType} />
            </main>

            <footer className="flex gap-[24px] flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://www.police.be.ch/"
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
                    Kantonpolizei Bern 2025
                </a>
            </footer>
        </div>
    );
}
