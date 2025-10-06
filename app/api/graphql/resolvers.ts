import { EventType } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";

interface CreateEventInput {
  name: string;
  description: string;
  posterLink: string;
  brochureLink: string;
  type?: EventType[];
  regLink?: string;
  date: string;
}

interface UpdateEventInput {
  id: string;
  name?: string;
  description?: string;
  posterLink?: string;
  brochureLink?: string;
  type?: EventType[];
  regLink?: string;
  date?: string;
}

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
      const eventData = await prisma.event.findUnique({ where: { id } });
      if (!eventData) throw new Error("No event found");

      return {
        ...eventData,
        date: eventData.date.toISOString(),
      };
    },
  },

  Mutation: {
    createEvent: async (_: any, input: CreateEventInput) => {
      const newEvent = await prisma.event.create({
        data: input,
      });

      return {
        ...newEvent,
        date: newEvent.date.toISOString(),
      };
    },

    updateEvent: async (_: any, input: UpdateEventInput) => {
      const { id, ...rest } = input;
      const event = await prisma.event.findUnique({ where: { id } });

      if (!event) {
        throw new Error("No event found");
      }

      const updatedEvent = Object.fromEntries(
        Object.entries(rest).filter(([_, value]) => value !== undefined)
      );

      const updated = await prisma.event.update({
        where: { id },
        data: updatedEvent,
      });

      return {
        ...updated,
        date: updated.date.toISOString(),
      };
    },

    deleteEvent: async (_: any, { id }: { id: string }) => {
      const event = await prisma.event.delete({ where: { id } });
      return {
        ...event,
        date: event.date.toISOString(),
      };
    },
  },
};
