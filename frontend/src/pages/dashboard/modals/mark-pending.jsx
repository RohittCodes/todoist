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
import { MdPendingActions } from "react-icons/md";
import useAuth from "../../../hooks/use-auth";

const MarkPending = (
    { task }
) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { auth } = useAuth()

    const userId = auth.user.id;

    const onStatusChange = async () => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${userId}/${task._id}/pending`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button color="warning" isIconOnly onPress={onOpen}>
            <MdPendingActions size={24} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-semibold">Mark Task as Pending</p>
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to mark this task as pending?</p>
                                <p className="text-sm text-gray-500">
                                    Marking this task as pending will move it to the pending tasks list.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="warning" onClick={() => {
                                    onStatusChange()
                                    onClose()
                                }}>
                                    Mark as Pending
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default MarkPending