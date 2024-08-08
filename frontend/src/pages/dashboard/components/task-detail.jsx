import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import useAuth from "../../../hooks/use-auth"
import TaskWrapper from "./task-wrapper"

const TaskDetails = () => {
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const { auth } = useAuth()

    const userId = auth.user.id

    useEffect(() => {
        const fetchTask = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${userId}/${id}`)
                setTask(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchTask()
    }, [id])

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="w-full max-w-3xl p-4 space-y-4">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <TaskWrapper task={task} isDetails />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskDetails