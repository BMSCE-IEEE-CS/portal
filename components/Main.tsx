"use client";

import { useSession } from "next-auth/react";

const Main = () => {
  const { data: session, status } = useSession();

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
        <div className="grid md:grid-cols-2">
          <h1>create an event</h1>
          <h1>events list</h1>
          <h1>each event will have a provision to update and delete</h1>
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
