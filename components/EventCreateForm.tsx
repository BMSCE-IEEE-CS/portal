"use client";

import { EventType } from "@/app/generated/prisma";
import { CREATE_EVENT } from "@/lib/operations";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const EventCreateForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [posterLink, setPosterLink] = useState<string>("");
  const [posterLinkPreview, setPosterLinkPreview] = useState<string | null>(
    null
  );
  const [brochureLink, setBrochureLink] = useState<string>("");
  const [regLink, setRegLink] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<EventType[]>([]);

  const router = useRouter();
  const [createLoading, setCreateLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [createEvent] = useMutation(CREATE_EVENT);

  const handleCreate = async () => {
    if (!name.trim() || !description.trim() || !posterLink.trim()) {
      alert("Please enter event name, description and poster link");
    } else {
      setCreateLoading(true);
      try {
        const isoDateConvert = new Date(date).toISOString();
        await createEvent({
          variables: {
            name,
            description,
            posterLink,
            brochureLink,
            regLink,
            date: isoDateConvert,
            type,
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setPosterLinkPreview(URL.createObjectURL(file));
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) throw Error("Cloudinary upload failed");

        const data = await res.json();

        if (data.secure_url) {
          setPosterLink(data.secure_url);
          toast.success("Image uploaded");
        } else {
          throw new Error("no secure URL returned from cloudinary");
        }
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error("Image upload failed");
      } finally {
        setUploading(false);
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
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full text-gray-200
             file:mr-2 file:py-2 file:px-4
             file:rounded-full file:font-semibold
             file:bg-black file:text-white file:cursor-pointer cursor-pointer"
      />
      {posterLinkPreview && (
        <Image
          src={posterLinkPreview as string}
          width={200}
          height={200}
          alt={name}
        />
      )}
      <input
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        type="text"
        placeholder="Brochure Link"
        value={brochureLink}
        onChange={(e) => setBrochureLink(e.target.value)}
      />

      <input
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        type="text"
        placeholder="Registration Link"
        value={regLink}
        onChange={(e) => setRegLink(e.target.value)}
      />
      <select
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        value={type[0] ?? ""}
        onChange={(e) => setType([e.target.value as EventType])}
      >
        <option value="">Select Event Type</option>
        <option value="WORKSHOP">Workshop</option>
        <option value="SEMINAR">Seminar</option>
        <option value="TALK">Talk</option>
        <option value="IDEATHON">Ideathon</option>
        <option value="HACKATHON">Hackathon</option>
        <option value="COMPETITION">Competition</option>
        <option value="PEER">Peer Learning</option>
        <option value="SUMMIT">Summit</option>
        <option value="SOCIAL">Social</option>
        <option value="CONFERENCE">Conference</option>
      </select>

      <button
        onClick={handleCreate}
        disabled={createLoading || uploading}
        className="bg-slate-800 text-white rounded-xl p-2 text-xl font-semibold disabled:bg-slate-500 cursor-pointer"
      >
        {uploading || createLoading ? "Uploading..." : "Create"}
      </button>
    </div>
  );
};

export default EventCreateForm;
