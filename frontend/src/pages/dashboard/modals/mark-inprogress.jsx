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
import { CgGoogleTasks } from "react-icons/cg";
import useAuth from "../../../hooks/use-auth";

const MarkInProgress = (
    { task }
) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { auth } = useAuth()

    const userId = auth.user.id;

    const onStatusChange = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${userId}/${task._id}/inprogress`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button color="primary" isIconOnly onPress={onOpen}>
                <CgGoogleTasks size={24} />
              </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-semibold">Mark Task as In Progress</p>
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to mark this task as in progress?</p>
                                <p className="text-sm text-gray-500">
                                    Marking this task as in progress will move it to the in progress tasks list.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={() => {
                                    onStatusChange()
                                    onClose()
                                }}>
                                    Mark as In Progress
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default MarkInProgress