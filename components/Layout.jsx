import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <nav className="w-full text-xl pl-10 font-medium bg-gray-700 flex flex-row items-start justify-items-center">
        <Link href="/">
          <button className="rounded text-gray-50 p-4 hover:bg-gray-400">
            {" "}
            Home
          </button>
        </Link>
        <Link href="/databylocation">
          <button className="rounded text-gray-50 p-4 hover:bg-gray-400">
            {" "}
            Find Stations
          </button>
        </Link>
      </nav>

      <main className="p-10 min-h-screen" key={children}>
        {children}
      </main>
      <footer className="bg-gray-700 w-full text-center p-4 text-gray-50 text-sm">
        <a className="text-gray-50" href="https://theoz.dev" rel="noref">
          Theo OZ
        </a>
      </footer>
    </div>
  );
}
