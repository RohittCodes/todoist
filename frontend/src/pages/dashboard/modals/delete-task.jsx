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
import useAuth from "../../../hooks/use-auth";

const DeleteTask = (
    { task }
) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { auth } = useAuth()
    const userId = auth.user.id;

    const onDelete = async () => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${userId}/${task._id}`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button className="w-full bg-transparent text-left hover:bg-red-600 hover:text-white" onPress={onOpen}>
                Delete
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-semibold">Delete Task</p>
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this task?</p>
                                <p className="text-sm text-gray-500">
                                    This action cannot be undone.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger"
                                    onPress={() => {
                                        onDelete()
                                        onClose()
                                    }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteTask