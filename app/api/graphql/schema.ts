import gql from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    name: String!
    description: String!
    posterLink: String!
    brochureLink: String
    dateTime: String
    venue: String
    ieeeFee: Int
    nonIeeeFee: Int
    type: [EventType]
    pocsName: [String!]
    pocsPhone: [String!]
    createdAt: String
  }

  enum EventType {
    WORKSHOP
    HACKATHON
    TALK
    COMPETITION
    SOCIAL
    PEER
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
      dateTime: String
      venue: String
      ieeeFee: Int
      nonIeeeFee: Int
      type: [EventType]
      pocsName: [String!]
      pocsPhone: [String!]
    ): Event!
    deleteEvent(id: ID!): Event
  }
`;
