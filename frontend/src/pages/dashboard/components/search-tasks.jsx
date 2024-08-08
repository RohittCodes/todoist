import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure
} from "@nextui-org/react";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import axios from "axios";
import useAuth from "../../../hooks/use-auth";

const SearchTasks = () => {

  const [inputValue, setInputValue] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();
  const userId = auth.user.id;

  const onInputChange = async (e) => {
    setInputValue(e.target.value);
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${userId}?search=${e.target.value}`);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-12 flex-col space-y-2">
        <div onClick={onOpen} className="w-full cursor-pointer flex items-center justify-center py-1">
        <Input
          isDisabled
          placeholder="Search for tasks..."
          radius="lg"
          className="ring-1 ring-gray-300 dark:ring-gray-700 rounded-lg shadow-sm"
          startContent={
            <CgSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 mt-1" />
          }
        />
        </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Input
                  isClearable
                  radius="lg"
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "bg-default-200/50",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "hover:bg-default-200/70",
                      "group-data-[focus=true]:bg-default-200/50",
                      "!cursor-text",
                    ],
                  }}
                  placeholder="Type to search..."
                  startContent={
                    <CgSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 mt-1" />
                  }

                  value={inputValue}
                  onChange={onInputChange}
                />
              </ModalHeader>
              <ModalBody>
                {
                  !loading ? (
                    tasks && tasks.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {tasks.map(task => (
                          <div key={task._id} className="flex items-center justify-between p-2 bg-default-200/50 rounded-lg shadow-sm">
                            <div className="flex flex-col gap-1">
                              <p className="text-lg font-semibold">{task.title}</p>
                              <p className="text-sm font-light">{task.description}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                              {/* <p className="text-sm font-semibold">{task.dueDate}</p> */}
                              <p className="text-sm font-semibold">{task.priority}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32">
                        <p className="text-lg font-semibold">No tasks found</p>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-lg font-semibold">Loading...</p>
                    </div>
                  )
                }
              </ModalBody>
              <ModalFooter>
                <Button auto onPress={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SearchTasks

