import { gql } from "@apollo/client";

class Query {
  FETCHHOMEPOSTS = gql`
    query Posts {
      posts {
        id
        message
        greetings
        regards
        createdAt
        Sender {
          id
          fullname
          role
          image
        }
        Acknowledgements {
          fullname
          id
          image
          createdAt
        }
        type
      }
    }
  `;

  FETCHALLPOSTS = gql`
    query AllPostsAsc {
      allPostsAsc {
        id
        message
        greetings
        regards
        createdAt
        Sender {
          fullname
          role
          image
        }
        Acknowledgements {
          fullname
          id
          image
          createdAt
        }
        type
      }
    }
  `;

  FETCHCURRENTUSERDB = gql`
    query UniqueUser($email: String!) {
      uniqueUser(email: $email) {
        id
        fullname
        image
        email
      }
    }
  `;

  FETCHTEAM = gql`
    query Users {
      users {
        image
        id
      }
    }
  `;

  CREATEPOST = gql`
    mutation CreatePost($input: CreateChatInput!) {
      createPost(input: $input) {
        id
      }
    }
  `;

  CHATFILTERS = gql`
    query PostFilters($chatType: ChatTypeEnum!) {
      postFilters(chatType: $chatType) {
        id
        message
        greetings
        regards
        createdAt
        Sender {
          fullname
          role
          image
        }
        Acknowledgements {
          fullname
          id
          image
          createdAt
        }
        type
      }
    }
  `;
}

export const Queries = new Query();
