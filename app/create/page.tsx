"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import EventCreateForm from "@/components/EventCreateForm";
import { useSession } from "next-auth/react";

const Create = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Navbar />
      {session?.user && session.user.role.includes("ADMIN") ? (
        <div className="max-w-4xl flex flex-col items-center mx-auto mt-10 w-full">
          <h1 className="text-3xl md:text-4xl">Create Event</h1>
          <EventCreateForm />
        </div>
      ) : (
        <div className="mt-10 bg-red-500 rounded-lg">
          <h1 className="p-6 font-bold">
            Please login with sufficient permissions.
          </h1>
        </div>
      )}
    </div>
  );
};

export default Create;
