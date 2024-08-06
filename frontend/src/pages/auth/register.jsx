import {
    Card, CardHeader, CardBody, CardFooter
} from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/logo.svg";
import axios from "axios";

const RegisterPage = () => {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="lg:w-1/3 w-1/2 px-8 py-6">
                <CardHeader className="flex justify-center items-center space-x-2">
                    <img src={Logo} alt="Logo" className="w-8 h-8" />
                    <h1 className="text-3xl font-bold text-center text-blue-500">
                        Todoist
                    </h1>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-col items-center space-y-4 justify-center">
                    <h1 className="text-2xl font-bold text-center">Hello there!</h1>
                    <p className="text-center">Register to your account to continue</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            label="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        <Input
                            type="text"
                            placeholder="Username"
                            label="Username"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 6 characters long"
                                }
                            })
                            }
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            label="Password" 
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                        />
                        <div className="flex justify-center">
                            <Button color="primary" type="submit" className="w-full">
                                Register
                            </Button>
                        </div>
                    </form>
                </CardBody>
                <Divider />
                <CardFooter>
                    <div className="flex justify-center">
                        Already have an account?&nbsp;<Link to="/login" className="text-blue-500">Login</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default RegisterPage;