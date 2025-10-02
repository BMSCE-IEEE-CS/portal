import { EventType } from "@/app/generated/prisma";
import { DELETE_EVENT } from "@/lib/operations";
import { useMutation } from "@apollo/client";
import { deleteObject, ref } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface EventCardProps {
  id: string;
  name: string;
  description: string;
  posterLink: string;
  brochureLink?: string | null;
  type?: EventType[];
  regLink?: string | null;
  date: String;
}

const EventCard = ({
  id,
  name,
  description,
  posterLink,
  brochureLink,
  type = [],
  regLink,
  date,
}: EventCardProps) => {
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [wait, setWait] = useState(false);

  console.log(regLink);

  const handleDelete = async (id: string, url: string) => {
    setWait(true);
    try {
      const getPublicId = (url: string) => {
        const cleanUrl = url.split("?")[0];

        const match = cleanUrl.match(
          /\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp)$/
        );
        if (!match) throw new Error("Invalid cloudinary url");
        return match[1];
      };
      const publicId = getPublicId(url);
      const res = await fetch("/api/cloudinaryImage", {
        method: "POST",
        body: JSON.stringify({ publicId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Deletion failed");

      toast.success("Poster deleted");

      await deleteEvent({
        variables: { id },
        onCompleted: (data) => {
          toast.success(`Deleted ${data.deleteEvent.name}`);
          window.location.reload();
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Error deleting the event");
    } finally {
      setWait(false);
    }
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto bg-slate-900/80 rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 aspect-square relative">
        <Image
          src={posterLink}
          alt={`${name} Poster`}
          fill
          className="object-fill"
          unoptimized
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAApNJREFUWEfFl9luwkAMRROW//9BFgECgVjfWVI50hndcTwJtFWLNBrUlPiMfb1MfT6fm6qqqtfrVTVN0+7P57Ndj8cj7Xznuf2vLfvUdd2u0WjUrvF4HC6e285vagAwPgRgYMACYBD68j8BMAj9/AtAFILS6e3vhIdwteG7XC4N8bRT+RCoDtCG7aqBUggmk0lHC3gqacAAVIRqxIyzVJSADnmgD8BAkgfsixehGlcIABGiZoG6GeO6E4IsC67XaxiCCIBwaCYA4FNQDasnOqloAIRANeAB7vd7qgkaAvNcVAPMqC4VZ8cDGgItQkCYcQUCgFT0AN6410ImRDwQVUEzinF21cAnAEBpKraZcLvdMg2oB7xxwoAGIgBOO51OsxAAgFBTGCIPIDYz6CFUiJqGuNW7X0HMuD0fDIHGGwjVAV7ydQADQGCcPRSizwIfgsgL3wUgPJkHqIQqQq9+74VPALwW8ELSgO8FlFyF+A0AAwlDYPOANiNOp+KLAKgFvhSrCM3ooAdOp9PbAFEx8qX4XQCKV308HjsAQ1lgz3Uq4mW4uJQFoQgPh0PbCyIRUgk1E6I6wDxQAvA9IcuC/X6fNSPfC0pp6DWg3dB7QKsgkGkg2e12HQ+QCX2lmKmIuVAroRYkLUJUQXueALbbbacdaynWhqSDideAvVDTrNQRO81os9kUPRC141I3VCFGw4gfSpIH1ut1OBP2DSR+ItKhNPKCn5SzgWS1Wv14JKMW6EyIDnTvtGKbB5bLZRYCxvLSUEoNiDTQdy3THpB5YLFYFAF8X9D7YQlgCKJzL5jP5yFAybh2QnrIO5dTP5Kne4EB8CLb9WLiIaKbEVOxDqYlL+jpE8BsNuv1gEL8BEDvA6qBL91F5lbaApcDAAAAAElFTkSuQmCC"
        />
      </div>

      <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-white">{name}</h1>
        <p className="text-slate-300 mt-2 text-justify whitespace-pre-line">
          {description}
        </p>

        <p className="text-slate-300 mt-6 text-justify whitespace-pre-line">
          📅{" "}
          {new Date(date.toString()).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {brochureLink && (
          <Link
            href={brochureLink}
            target="_blank"
            className="mt-4 inline-block underline text-slate-200"
          >
            📄 View event brochure
          </Link>
        )}

        {regLink && (
          <Link
            href={regLink}
            target="_blank"
            className="mt-2 inline-block underline text-slate-200"
          >
            Registration Link
          </Link>
        )}

        {type.map((eventType) => (
          <div>
            <p className="mt-2 inline-block text-slate-200">{eventType}</p>
          </div>
        ))}

        <button
          onClick={() => handleDelete(id, posterLink)}
          className="bg-red-400 mt-6 rounded-xl px-4 py-2 text-lg text-black font-semibold self-start"
        >
          {wait ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
