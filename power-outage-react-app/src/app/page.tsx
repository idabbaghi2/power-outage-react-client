import Image from "next/image";
import PowerOutageList from "../components/PowerOutageList";

export default function Home() {
  return (
    <div className="grid min-h-screen p-8 pb-20 gap-8 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
          />
          <span className="text-xl">+</span>
          <span className="text-xl font-bold">Power Outage Tracker</span>
        </div>
        <p className="mt-2 text-gray-500">
          Real-time tracking of power outages from grid operators
        </p>
      </header>

      <main className="container mx-auto max-w-6xl">
        <PowerOutageList />
      </main>

      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          Documentation
        </a>
      </footer>
    </div>
  );
}
