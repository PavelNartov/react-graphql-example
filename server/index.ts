import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { schema } from './schema'
import { context } from './context'

interface User {
  id: string
  username: string
  age: number
}

interface UserInput {
  username: string
  age: number
}

interface Id {
  id: string
}

interface IUserInput {
  input: UserInput
}

const users: User[] = [{ id: 'u1', username: 'Pavel Nartov', age: 44 }]

const PORT = 3300

const app = express()
app.use(cors())

const createUser = (input: UserInput): User => {
  const id = Date.now().toString()
  return {
    id,
    ...input,
  }
}

const root = {
  getAllUsers: (): User[] => {
    return users
  },

  getUser: ({ id }: Id): User | undefined => {
    return users.find((user) => user.id === id)
  },

  createUser: ({ input }: IUserInput): User => {
    const user = createUser(input)
    users.push(user)
    return user
  },
}

app.use('/status', (req, res) => {
  res.send({ status: true })
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    context: context,
    graphiql: true,
  })
)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
