import { EventType } from "@/app/generated/prisma";
import Image from "next/image";

interface EventCardProps {
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
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-md mx-auto">
      <div className="w-full">
        <Image
          src={posterLink}
          alt={`${name} Poster`}
          width={1000}
          height={1000}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>

        {dateTime && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📅 {dateTime}
          </p>
        )}
        {venue && (
          <p className="text-sm text-gray-500 dark:text-gray-400">📍 {venue}</p>
        )}

        {(ieeeFee !== null || nonIeeeFee !== null) && (
          <div className="flex gap-6 text-sm text-gray-700 dark:text-gray-300">
            {ieeeFee !== null && <p>IEEE Fee: ₹{ieeeFee}</p>}
            {nonIeeeFee !== null && <p>Non-IEEE Fee: ₹{nonIeeeFee}</p>}
          </div>
        )}

        {type.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {type.map((t) => (
              <span
                key={t}
                className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {brochureLink && (
          <a
            href={brochureLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm underline"
          >
            📄 View Brochure
          </a>
        )}

        {pocsName.length > 0 && (
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold">Points of Contact:</p>
            <ul className="list-disc list-inside">
              {pocsName.map((name, idx) => (
                <li key={idx}>
                  {name} — {pocsPhone[idx] || "N/A"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
