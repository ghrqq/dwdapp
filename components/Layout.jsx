import React from "react";
import Link from "next/link";
import Loader from "./Loader";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Theo's DWD Client</title>
        <meta name="title" content="Theo's DWD Client" />
        <meta
          name="description"
          content="A beautiful web app to query and display historical weather data of DWD OpenData."
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dwdapp.vercel.app/" />
        <meta property="og:title" content="Theo's DWD Client" />
        <meta
          property="og:description"
          content="A beautiful web app to query and display historical weather data of DWD OpenData."
        />
        <meta
          property="og:image"
          content="https://dwdapp.vercel.app/meta.png"
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dwdapp.vercel.app/" />
        <meta property="twitter:title" content="Theo's DWD Client" />
        <meta
          property="twitter:description"
          content="A beautiful web app to query and display historical weather data of DWD OpenData."
        />
        <meta
          property="twitter:image"
          content="https://dwdapp.vercel.app/meta.png"
        />
      </Head>
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
        <div className="w-full mx-auto text-center">
          <Loader />
        </div>
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
