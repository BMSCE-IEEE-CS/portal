"use client";

import { EventType } from "@/app/generated/prisma";
import { UPDATE_EVENT } from "@/lib/operations";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface EventUpdateFormProps {
  initialData: {
    id: string;
    name?: string;
    description?: string;
    posterLink?: string;
    brochureLink?: string;
    regLink?: string;
    date?: string;
    type?: EventType[];
  };
}

const EventUpdateForm = ({ initialData }: EventUpdateFormProps) => {
  const [name, setName] = useState(initialData.name ?? "");
  const [description, setDescription] = useState(initialData.description ?? "");
  const [posterLink, setPosterLink] = useState(initialData.posterLink ?? "");
  const [posterLinkPreview, setPosterLinkPreview] = useState<string | null>(
    initialData.posterLink ?? null
  );
  const [brochureLink, setBrochureLink] = useState(
    initialData.brochureLink ?? ""
  );
  const [regLink, setRegLink] = useState(initialData.regLink ?? "");
  const [date, setDate] = useState(initialData.date ?? "");
  const [type, setType] = useState<EventType[]>(initialData.type ?? []);

  const router = useRouter();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [updateEvent] = useMutation(UPDATE_EVENT);

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const isoDateConvert = date ? new Date(date).toISOString() : undefined;
      await updateEvent({
        variables: {
          id: initialData.id,
          name,
          description,
          posterLink,
          brochureLink,
          regLink,
          date: isoDateConvert,
          type,
        },
        onCompleted: (data) => {
          toast.success(`${data.updateEvent.name} updated.`);
          router.push("/");
        },
      });
    } catch (e) {
      toast.error(`Error occurred: ${e}`);
    } finally {
      setUpdateLoading(false);
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
          throw new Error("No secure URL returned from Cloudinary");
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
        className="w-full text-gray-200 file:mr-2 file:py-2 file:px-4 file:rounded-full file:font-semibold file:bg-black file:text-white file:cursor-pointer cursor-pointer"
      />
      {posterLinkPreview && (
        <Image src={posterLinkPreview} width={200} height={200} alt={name} />
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
        <option value="HACKATHON">Hackathon</option>
        <option value="COMPETITION">Competition</option>
        <option value="PEER">Peer Learning</option>
        <option value="SUMMIT">Summit</option>
        <option value="SOCIAL">Social</option>
      </select>

      <button
        onClick={handleUpdate}
        disabled={updateLoading || uploading}
        className="bg-slate-800 text-white rounded-xl p-2 text-xl font-semibold disabled:bg-slate-500 cursor-pointer"
      >
        {uploading || updateLoading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default EventUpdateForm;
