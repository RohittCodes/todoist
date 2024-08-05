import { Button, ButtonGroup } from "@nextui-org/button"
import { FaTwitter } from "react-icons/fa"

function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <Button color="primary" isIconOnly>
        <FaTwitter />
      </Button>
    </h1>
  )
}

export default App
