import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
  {
    getAllUsers {
      id
      username
      age
    }
  }
`

export const GET_ONE_USER = gql`
  query getUser($id: ID) {
    getUser(id: $id) {
      id
      username
    }
  }
`
