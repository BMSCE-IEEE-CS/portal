import gql from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    name: String!
    description: String!
    posterLink: String!
    brochureLink: String
    type: [EventType]
    regLink: String
    date: String!
    createdAt: String
  }

  enum EventType {
    WORKSHOP
    HACKATHON
    TALK
    COMPETITION
    SOCIAL
    PEER
    SEMINAR
    SUMMIT
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(
      name: String!
      description: String!
      posterLink: String!
      brochureLink: String
      type: [EventType]
      regLink: String
      date: String!
    ): Event!
    deleteEvent(id: ID!): Event
  }
`;
