import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalFooter,
    Button,
    useDisclosure
} from "@nextui-org/react"
import axios from "axios"
import { MdOutlineTaskAlt } from "react-icons/md";
import useAuth from "../../../hooks/use-auth";

const MarkComplete = (
    { task }
) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { auth } = useAuth()

    const userId = auth.user.id;

    const onStatusChange = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${userId}/${task._id}/complete`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button color="success" isIconOnly onPress={onOpen}>
                <MdOutlineTaskAlt size={24} />
              </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-semibold">Mark Task as Complete</p>
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to mark this task as complete?</p>
                                <p className="text-sm text-gray-500">
                                    Marking this task as complete will move it to the completed tasks list.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="success" onClick={() => {
                                    onStatusChange()
                                    onClose()
                                }}>
                                    Mark as Complete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default MarkComplete