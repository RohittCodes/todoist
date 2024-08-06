import { Button, ButtonGroup } from "@nextui-org/button"
import { useEffect, useState } from "react"
import { FaTwitter } from "react-icons/fa"
import axios from "axios"

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [])

  console.log(users)

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      {users.map(user => (
        <div key={user._id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
      <Button color="primary" isIconOnly>
        <FaTwitter />
      </Button>
    </h1>
  )
}

export default App
