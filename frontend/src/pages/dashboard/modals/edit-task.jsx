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
  import useAuth from "../../../hooks/use-auth";
  import axios from "axios";
  import { useForm, Controller } from "react-hook-form";
  import { useState } from "react";
import { IoPencil } from "react-icons/io5";

const EditTask = (
    { task }
) => {

    const [categoryValue, setCategoryValue] = useState("personal");

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { auth } = useAuth();
    const user = auth.user;
    const userId = user.id;
  
    const { control, register, handleSubmit, setValue } = useForm({
      defaultValues: {
        startDate: today(),
        endDate: today(),
        startTime: now(getLocalTimeZone()),
        endTime: now(getLocalTimeZone()),
        category: "personal",
      },
    });
  
    const onSubmit = async (data) => {
      const { name, description, priority, startDate, endDate, startTime, endTime, category } = data;
  
      const dataToSend = {
        title: name,
        description: description,
        status: "pending",
        priority: priority,
        startDate: startDate,
        dueDate: endDate,
        startTime: startTime,
        endTime: endTime,
        category: category,
        owner: user.id,
      };

      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${userId}/${task._id}`, dataToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        window.location.reload();
        onOpenChange();
      } catch (error) {
        console.log(error);
      }
    };

    return (
        <>
            <Button color="default" isIconOnly onPress={onOpen}>
                <IoPencil size={24} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                                <ModalHeader className="flex flex-col gap-1">
                                    <h4 className="text-lg font-semibold">Edit Task</h4>
                                    <p className="text-sm text-default-400">Note: Some of the fields have been pre-filled and isn't from your you last input</p>
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Task Name"
                                        defaultValue={task.title}
                                        {...register("name", {
                                            required: "Task name is required",
                                        })}
                                    />
                                    <div className="flex gap-4">
                                        <Controller
                                            name="startDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DateInput
                                                    label="Start Date"
                                                    defaultValue={task.startDate}
                                                    value={field.value}
                                                    onChange={(date) => {
                                                        field.onChange(date);
                                                    }}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="endDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DateInput
                                                    label="Due Date"
                                                    defaultValue={task.dueDate}
                                                    value={field.value}
                                                    onChange={(date) => {
                                                        field.onChange(date);
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <Controller
                                            name="startTime"
                                            control={control}
                                            render={({ field }) => (
                                                <TimeInput
                                                    label="Start Time"
                                                    value={field.value}
                                                    onChange={(time) => {
                                                        field.onChange(time);
                                                    }}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="endTime"
                                            control={control}
                                            render={({ field }) => (
                                                <TimeInput
                                                    label="Due Time"
                                                    defaultValue={task.endTime}
                                                    value={field.value}
                                                    onChange={(time) => {
                                                        field.onChange(time);
                                                    }}
                                                />
                                            )}
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
                                        defaultValue={task.priority}
                                        {...register("priority", {
                                            required: "Priority is required",
                                        })}
                                    />
                                    <Textarea
                                        label="Description (200 characters)"
                                        placeholder="Enter task description here..."
                                        defaultValue={task.description}
                                        maxLength={200}
                                        {...register("description", {
                                            required: "Description is required",
                                        })}
                                    />
                                    <Select
                                        label="Category"
                                        placeholder="Select a category"
                                        value={categoryValue}
                                        onChange={(e) => {
                                            setCategoryValue(e.target.value);
                                            setValue("category", e.target.value); // Update react-hook-form
                                        }}
                                        {...register("category", {
                                            required: "Category is required",
                                        })}
                                    >
                                        {categories.map((category) => (
                                            <SelectItem key={category.key} value={category.key}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Update
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditTask


const categories = [
    { key: "work", label: "Work" },
    { key: "personal", label: "Personal" },
    { key: "school", label: "School" },
    { key: "others", label: "Other" },
  ];
  