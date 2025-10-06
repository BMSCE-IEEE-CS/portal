"use client";
import Loader from "@/components/Loader";
import Hero from "@/components/Main";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`flex flex-col w-full min-h-screen items-center bg-gray-800 justify-center transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Main />
    </div>
  );
}
