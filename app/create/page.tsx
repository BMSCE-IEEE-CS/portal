import React from "react";
import { Event } from "../generated/prisma";
import Navbar from "@/components/Navbar";
import EventCreateForm from "@/components/EventCreateForm";

const Create = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Navbar />
      <div className="max-w-4xl flex flex-col items-center mx-auto mt-10 w-full">
        <h1 className="text-3xl md:text-4xl">Create Event</h1>
        <EventCreateForm />
      </div>
    </div>
  );
};

export default Create;
