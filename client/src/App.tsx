import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import './App.css'
import { GET_ALL_USERS, GET_ONE_USER } from './query/user'
import { CREATE_USER } from './mutations/user'

interface User {
  id: string
  username: string
  age: number
}

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const { data: oneUserData, loading: loadingOneUser } = useQuery(
    GET_ONE_USER,
    { variables: { id: 'u1' } }
  )
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([] as User[])
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  // console.log('All users data:', data)
  console.log('One user data:', oneUserData)

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  if (loading) return <h1>Loading...</h1>

  const setUser = (e: React.MouseEvent) => {
    e.preventDefault()

    newUser({
      variables: {
        input: { username, age },
      },
    }).then(({ data: any }) => {
      console.log('RESULT', data)
      setUsername('')
      setAge(0)
    })
  }

  const getAll = (e: React.MouseEvent) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className="App">
      <form>
        <label>Name</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <label>Age</label>
        <input
          value={age}
          onChange={(e) => setAge(Number.parseInt(e.target.value))}
          type="number"
        />
        <div className="btns">
          <button onClick={(e) => setUser(e)}>Создать</button>
          <button onClick={(e) => getAll(e)}>Получить</button>
        </div>
      </form>

      <div>
        {users.map((user) => (
          <div className="user">
            {user.id}. {user.username}: {user.age}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
