import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  DateInput,
  TimeInput,
  useDisclosure,
  Slider,
  Textarea,
  Select,
  SelectItem
} from "@nextui-org/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { now, today, getLocalTimeZone } from "@internationalized/date";


// TODO: Fetch data from the backend and populate some of the fields in the form, and save the data to the backend when the form is submitted.
const AddTaskModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentDate = today();
  const currentTime = now(getLocalTimeZone())

  return (
    <>
      <Button className="text-blue-500 rounded-md bg-gray-100 border border-gray-200 space-x-2" onPress={onOpen}>
        <IoMdAddCircleOutline size={24} />
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Task</ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  type="text"
                  label="Task Name"
                  defaultValue=""
                />
                <div className="flex gap-4">
                  <DateInput
                    label={"Start Date"}
                    defaultValue={currentDate}
                  />
                  <DateInput
                    label={"End Date"}
                    isRequired
                    defaultValue={currentDate}
                  />
                </div>
                <div className="flex gap-4">
                  <TimeInput
                    label="Start Time"
                    defaultValue={currentTime}
                  />
                  <TimeInput
                    label="End Time"
                    isRequired
                    defaultValue={currentTime}
                  />
                </div>
                <Slider
                  size="sm"
                  step={1}
                  color="foreground"
                  label="Priority- 1 (High) to 10 (Low)"
                  showSteps={true}
                  maxValue={10}
                  minValue={1}
                  defaultValue={10}
                />
                <Textarea
                  label="Description (200 characters)"
                  placeholder="Enter task description here..."
                  defaultValue=""
                  maxLength={200}
                />
                <Select
                  label="Category"
                  placeholder="Select a category"
                  defaultValue="personal"
                >
                  {categories.map((animal) => (
                    <SelectItem key={animal.key}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTaskModal;

const categories = [
  {key: "work", label: "Work"},
  {key: "personal", label: "Personal"},
  {key: "school", label: "School"},
  {key: "other", label: "Other"},
];