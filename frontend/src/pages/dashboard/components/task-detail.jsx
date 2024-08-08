import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import useAuth from "../../../hooks/use-auth"

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
            <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-md">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold">{task.title}</h1>
                        <p className="text-lg text-default-400">{task.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskDetails