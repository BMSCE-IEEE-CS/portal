"use client";

import { CREATE_EVENT } from "@/lib/operations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const EventCreateForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [posterLink, setPosterLink] = useState<string>("");

  const router = useRouter();
  const [createLoading, setCreateLoading] = useState(false);

  const [createEvent] = useMutation(CREATE_EVENT);

  const handleCreate = async () => {
    if (!name.trim() && !description.trim() && !posterLink.trim()) {
      alert("Please enter event name, description and poster link");
    } else {
      setCreateLoading(true);
      try {
        await createEvent({
          variables: {
            name,
            description,
            posterLink,
          },
          onCompleted: (data) => {
            toast.success(`${data.createEvent.name} created.`);
            router.push("/");
          },
        });
      } catch (e) {
        // alert(`Error occured: ${e}`)
        toast.error(`Error occured: ${e}`);
      } finally {
        setCreateLoading(false);
      }
    }
  };
  return (
    <div className="bg-slate-400 w-full p-4 text-black flex flex-col gap-3 rounded-xl mt-4">
      <input
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        rows={3}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        type="text"
        placeholder="Poster Link"
        value={posterLink}
        onChange={(e) => setPosterLink(e.target.value)}
      />
      <button
        onClick={handleCreate}
        disabled={createLoading}
        className="bg-slate-800 text-white rounded-xl p-2 text-xl font-semibold disabled:bg-slate-500"
      >
        Create
      </button>
    </div>
  );
};

export default EventCreateForm;
