import { EventType } from "@/app/generated/prisma";
import { storage } from "@/lib/firebase";
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
  dateTime?: string | null;
  venue?: string | null;
  ieeeFee?: number | null;
  nonIeeeFee?: number | null;
  type?: EventType[];
  pocsName: string[];
  pocsPhone: string[];
}

const EventCard = ({
  id,
  name,
  description,
  posterLink,
  brochureLink,
  dateTime,
  venue,
  ieeeFee,
  nonIeeeFee,
  type = [],
  pocsName,
  pocsPhone,
}: EventCardProps) => {
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [wait, setWait] = useState(false);

  const handleDelete = async (id: string, url: string) => {
    setWait(true);
    try {
      const pathMatch = url.match(/\/o\/(.*?)\?/);
      const encodedPath = pathMatch?.[1];
      if (!encodedPath) throw new Error("Invalid image url format");
      const decodedPath = decodeURIComponent(encodedPath);
      const imgRef = ref(storage, decodedPath);

      await deleteObject(imgRef);

      await deleteEvent({
        variables: { id },
        onCompleted: (data) => {
          toast.success(`Deleted ${data.deleteEvent.name}`);
          window.location.reload();
        },
      });
    } catch (err) {
      console.error("Error deleting the event:", err);
      toast.error("Error deleting the event");
    } finally {
      setWait(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900/80 rounded-2xl overflow-hidden shadow-md">
      <div className="w-full h-auto">
        <Image
          src={posterLink}
          alt={`${name} Poster`}
          width={1000}
          height={1000}
          className="w-full h-auto object-cover"
          unoptimized
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAApNJREFUWEfFl9luwkAMRROW//9BFgECgVjfWVI50hndcTwJtFWLNBrUlPiMfb1MfT6fm6qqqtfrVTVN0+7P57Ndj8cj7Xznuf2vLfvUdd2u0WjUrvF4HC6e285vagAwPgRgYMACYBD68j8BMAj9/AtAFILS6e3vhIdwteG7XC4N8bRT+RCoDtCG7aqBUggmk0lHC3gqacAAVIRqxIyzVJSADnmgD8BAkgfsixehGlcIABGiZoG6GeO6E4IsC67XaxiCCIBwaCYA4FNQDasnOqloAIRANeAB7vd7qgkaAvNcVAPMqC4VZ8cDGgItQkCYcQUCgFT0AN6410ImRDwQVUEzinF21cAnAEBpKraZcLvdMg2oB7xxwoAGIgBOO51OsxAAgFBTGCIPIDYz6CFUiJqGuNW7X0HMuD0fDIHGGwjVAV7ydQADQGCcPRSizwIfgsgL3wUgPJkHqIQqQq9+74VPALwW8ELSgO8FlFyF+A0AAwlDYPOANiNOp+KLAKgFvhSrCM3ooAdOp9PbAFEx8qX4XQCKV308HjsAQ1lgz3Uq4mW4uJQFoQgPh0PbCyIRUgk1E6I6wDxQAvA9IcuC/X6fNSPfC0pp6DWg3dB7QKsgkGkg2e12HQ+QCX2lmKmIuVAroRYkLUJUQXueALbbbacdaynWhqSDideAvVDTrNQRO81os9kUPRC141I3VCFGw4gfSpIH1ut1OBP2DSR+ItKhNPKCn5SzgWS1Wv14JKMW6EyIDnTvtGKbB5bLZRYCxvLSUEoNiDTQdy3THpB5YLFYFAF8X9D7YQlgCKJzL5jP5yFAybh2QnrIO5dTP5Kne4EB8CLb9WLiIaKbEVOxDqYlL+jpE8BsNuv1gEL8BEDvA6qBL91F5lbaApcDAAAAAElFTkSuQmCC"
        />
      </div>

      <div className="p-4">
        <h1 className="text-xl font-bold text-white">{name}</h1>
        <p className="text-slate-300 mt-2 text-justify whitespace-pre-line">
          {description}
        </p>

        <div className="mt-3 text-slate-200 space-y-1">
          {dateTime && <p>📅 {dateTime}</p>}
          {venue && <p>📍 {venue}</p>}
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-white">Registration Fee:</h2>
          <div className="flex gap-6 mt-1 text-slate-200">
            <p>
              <span className="font-bold">IEEE:</span> Rs. {ieeeFee ?? "-"}
            </p>
            <p>
              <span className="font-bold">Non IEEE:</span> Rs.{" "}
              {nonIeeeFee ?? "-"}
            </p>
          </div>
        </div>

        {brochureLink && (
          <Link
            href={brochureLink}
            target="_blank"
            className="mt-4 inline-block underline text-slate-200"
          >
            📄 View event brochure
          </Link>
        )}

        <div className="mt-4 text-slate-300 space-y-1">
          <p>For any queries, contact:</p>
          <div className="mt-2">
            {pocsName.map((person, idx) => (
              <p key={idx}>
                {person}: {pocsPhone[idx]}
              </p>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleDelete(id, posterLink)}
          className="bg-red-400 w-full mt-4 rounded-xl text-xl text-black font-semibold"
        >
          {wait ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
