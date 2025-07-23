"use client";

import { EventType } from "@/app/generated/prisma";
import { storage } from "@/lib/firebase";
import { CREATE_EVENT } from "@/lib/operations";
import { useMutation } from "@apollo/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const EventCreateForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [posterLink, setPosterLink] = useState<string>("");
  const [posterLinkPreview, setPosterLinkPreview] = useState<string | null>(
    null
  );
  const [brochureLink, setBrochureLink] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [ieeeFee, setIeeeFee] = useState<string>("");
  const [nonIeeeFee, setNonIeeeFee] = useState<string>("");
  const [type, setType] = useState<EventType[]>([]);
  const [pocsName, setPocsName] = useState<string[]>([]);
  const [pocsPhone, setPocsPhone] = useState<string[]>([]);

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
        await createEvent({
          variables: {
            name,
            description,
            posterLink,
            brochureLink,
            dateTime,
            venue,
            ieeeFee: parseInt(ieeeFee),
            nonIeeeFee: parseInt(nonIeeeFee),
            pocsName,
            pocsPhone,
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

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setPosterLinkPreview(URL.createObjectURL(file));
      const storageRef = ref(storage, `posters/${Date.now()}_${name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        setPosterLink(downloadUrl);
        toast.success("Image uploaded");
      } catch (e) {
        console.error("Image upload error:", e);
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
        onChange={handleImage}
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
        type="text"
        placeholder="Brochure Link"
        value={brochureLink}
        onChange={(e) => setBrochureLink(e.target.value)}
      />
      <input
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        type="text"
        placeholder="Date followed by time"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
      <input
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        type="text"
        placeholder="Venue"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
      />
      <div className="flex gap-2 w-full">
        <input
          className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
          type="number"
          placeholder="IEEE Fee"
          value={ieeeFee}
          onChange={(e) => setIeeeFee(e.target.value)}
        />
        <input
          className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
          type="text"
          placeholder="Non IEEE Fee"
          value={nonIeeeFee}
          onChange={(e) => setNonIeeeFee(e.target.value)}
        />
      </div>
      {/* type */}
      <input
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        type="text"
        placeholder="POCs Name(comma separated)"
        value={pocsName}
        onChange={(e) => setPocsName(e.target.value.split(","))}
      />
      <input
        className="p-2 bg-slate-300 w-full rounded-lg text-lg outline-none"
        type="text"
        placeholder="POCs Phone(comma separated)"
        value={pocsPhone}
        onChange={(e) => setPocsPhone(e.target.value.split(","))}
      />
      <button
        onClick={handleCreate}
        disabled={createLoading || uploading}
        className="bg-slate-800 text-white rounded-xl p-2 text-xl font-semibold disabled:bg-slate-500"
      >
        {uploading || createLoading ? "Uploading" : "Create"}
      </button>
    </div>
  );
};

export default EventCreateForm;
