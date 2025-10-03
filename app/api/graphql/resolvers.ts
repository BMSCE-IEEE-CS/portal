import { EventType } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";

export const resolvers = {
  Query: {
    events: async () => {
      const events = await prisma.event.findMany({
        orderBy: {
          date: "desc",
        },
      });

      return events.map((e) => ({
        ...e,
        date: e.date.toISOString(),
      }));
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
        type,
        regLink,
        date,
      }: {
        name: string;
        description: string;
        posterLink: string;
        brochureLink?: string;
        type: EventType[];
        regLink?: string;
        date: string;
      }
    ) => {
      const newEvent = await prisma.event.create({
        data: {
          name,
          description,
          posterLink,
          brochureLink,
          type,
          regLink,
          date,
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
