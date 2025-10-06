import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $name: String!
    $description: String!
    $posterLink: String!
    $brochureLink: String
    $type: [EventType]
    $regLink: String
    $date: String!
  ) {
    createEvent(
      name: $name
      description: $description
      posterLink: $posterLink
      brochureLink: $brochureLink
      type: $type
      regLink: $regLink
      date: $date
    ) {
      id
      name
      description
      posterLink
      brochureLink
      type
      regLink
      date
      createdAt
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $name: String
    $description: String
    $posterLink: String
    $brochureLink: String
    $type: [EventType]
    $regLink: String
    $date: String
  ) {
    updateEvent(
      id: $id
      name: $name
      description: $description
      posterLink: $posterLink
      brochureLink: $brochureLink
      type: $type
      regLink: $regLink
      date: $date
    ) {
      id
      name
      description
      posterLink
      brochureLink
      type
      regLink
      date
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
      regLink
      date
      createdAt
      type
    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query GetEventById($id: ID!) {
    event(id: $id) {
      id
      name
      description
      posterLink
      brochureLink
      regLink
      date
      type
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
