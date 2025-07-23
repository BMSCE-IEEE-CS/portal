import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $name: String!
    $description: String!
    $posterLink: String!
  ) {
    createEvent(
      name: $name
      description: $description
      posterLink: $posterLink
    ) {
      id
      name
      description
      posterLink
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
