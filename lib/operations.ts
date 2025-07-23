import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $name: String!
    $description: String!
    $posterLink: String!
    $brochureLink: String
    $dateTime: String
    $venue: String
    $ieeeFee: Int
    $nonIeeeFee: Int
    $type: [EventType]
    $pocsName: [String!]
    $pocsPhone: [String!]
  ) {
    createEvent(
      name: $name
      description: $description
      posterLink: $posterLink
      brochureLink: $brochureLink
      dateTime: $dateTime
      venue: $venue
      ieeeFee: $ieeeFee
      nonIeeeFee: $nonIeeeFee
      type: $type
      pocsName: $pocsName
      pocsPhone: $pocsPhone
    ) {
      id
      name
      description
      posterLink
      brochureLink
      dateTime
      venue
      ieeeFee
      nonIeeeFee
      type
      pocsName
      pocsPhone
      createdAt
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      name
      description
      posterLink
      brochureLink
      dateTime
      ieeeFee
      nonIeeeFee
      venue
      pocsName
      pocsPhone
      createdAt
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      name
    }
  }
`;
