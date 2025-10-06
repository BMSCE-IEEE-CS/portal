"use client";

import EventUpdateForm from "@/components/EventUpdateForm";
import { GET_EVENT_BY_ID } from "@/lib/operations";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";

const UpdateEventPage = () => {
  const { id } = useParams();
  const { data: session } = useSession();

  const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
    variables: { id },
    skip: !id,
  });

  if (!session?.user || !session.user.role.includes("ADMIN")) {
    return (
      <div className="mt-10 bg-red-500 rounded-lg">
        <h1 className="p-6 font-bold">
          Please login with sufficient permissions.
        </h1>
      </div>
    );
  }

  if (loading) return <p className="mt-10">Loading event data...</p>;
  if (error || !data?.event) return <p className="mt-10">Event not found.</p>;

  return (
    <div className="max-w-4xl flex flex-col items-center mx-auto w-full p-4">
      <h1 className="text-2xl">Update Event</h1>
      <p className="text-3xl md:text-4xl text-red-400 font-bold">
        {data.event.name}
      </p>
      <EventUpdateForm initialData={data.event} />
    </div>
  );
};

export default UpdateEventPage;
