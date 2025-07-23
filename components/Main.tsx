"use client";

import { Event } from "@/app/generated/prisma";
import { DELETE_EVENT, GET_EVENTS } from "@/lib/operations";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

const Main = () => {
  const { data: session, status } = useSession();

  const { data, loading, error, refetch } = useQuery(GET_EVENTS, {
    fetchPolicy: "cache-and-network",
  });
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent({
        variables: { id },
        onCompleted: (data) => {
          toast.success(`${data.deleteEvent.name} was deleted.`);
          refetch();
        },
      });
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="mt-10 bg-red-500 rounded-lg">
        <h1 className="p-6 font-bold">Login to manage events</h1>
      </div>
    );
  }

  return (
    <div>
      {session?.user.role.includes("ADMIN") ? (
        <div className="flex flex-col items-center justify-center w-full">
          <Link
            href="/create"
            className="flex px-6 py-4 items-center justify-center bg-orange-400 text-black font-bold text-xl mt-6 rounded-xl"
          >
            Create Event
          </Link>
          <div className="mt-10">
            {loading && <p className="mt-4">Fetching events...</p>}
            {error && <p className="text-red-400 mt-4">{error.message}</p>}
            {data?.events && (
              <div className="grid md:grid-cols-3 gap-4">
                {data.events.map((event: Event) => (
                  <div
                    key={event.id}
                    className="bg-slate-400 px-4 py-2 rounded-xl"
                  >
                    <h1>{event.name}</h1>
                    <h1>{event.description}</h1>
                    <h1>{event.posterLink}</h1>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-300 p-2 w-full rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-10 bg-red-500 rounded-lg">
          <h1 className="p-6 font-bold">
            You dont have sufficient permissions to manage events.
          </h1>
        </div>
      )}
    </div>
  );
};

export default Main;
