import { EventType } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";

export const resolvers = {
  Query: {
    events: async () => {
      return await prisma.event.findMany({ orderBy: { createdAt: "desc" } });
    },
    event: async (_: any, { id }: { id: string }) => {
      return await prisma.event.findUnique({ where: { id } });
    },
  },

  Mutation: {
    createEvent: async (
      _: any,
      {
        name,
        description,
        posterLink,
        brochureLink,
        dateTime,
        venue,
        ieeeFee,
        nonIeeeFee,
        type,
        pocsName,
        pocsPhone,
      }: {
        name: string;
        description: string;
        posterLink: string;
        brochureLink?: string;
        dateTime?: string;
        venue?: string;
        ieeeFee?: number;
        nonIeeeFee?: number;
        type: EventType[];
        pocsName: string[];
        pocsPhone: string[];
      }
    ) => {
      const newEvent = await prisma.event.create({
        data: {
          name,
          description,
          posterLink,
          brochureLink,
          dateTime,
          venue,
          ieeeFee,
          nonIeeeFee,
          type,
          pocsName,
          pocsPhone,
        },
      });

      return newEvent;
    },

    deleteEvent: async (_: any, { id }: { id: string }) => {
      const event = await prisma.event.delete({ where: { id } });
      return event;
    },
  },
};
