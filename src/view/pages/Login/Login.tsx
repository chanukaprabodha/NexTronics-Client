/*
import {useNavigate} from "react-router-dom";

export function Login() {

    const navigate = useNavigate();


    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                className="bg-white p-8 rounded-xl shadow-md w-80"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Log In
                </button>
                <div className="mt-1 mb-4 text-center">
                    <button onClick={() => navigate("/")}
                            className="text-sm text-gray-500 hover:text-gray-700 underline cursor-pointer mt-3.5">Home
                    </button>
                </div>
            </form>
        </div>
    );
}*/

import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {backendApi} from "../../../api.ts";
import swal from "sweetalert2";
import {getUserFromToken} from "../../../auth/auth.ts";
import type {UserData} from "../../../modal/UserData.ts";

type FormData = {
    username: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<FormData>();

    const authenticateUser = async (data: FormData) => {
        try {
            const userCredentials = {
                username: data.username,  // assuming your backend uses "username" for email
                password: data.password
            };

            const response = await backendApi.post('/auth/login', userCredentials);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const user: UserData = getUserFromToken(accessToken);

            localStorage.setItem('username', user.username as string);
            localStorage.setItem('role', user.role as string);

            alert("Successfully logged in!");
            navigate('/');
        } catch (error) {
            console.error(error);
            swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid username or password. Please try again.'
            })
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
            <div className="w-full max-w-sm bg-white border border-green-300 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-green-800 underline decoration-2 mb-6 text-center">
                    Sign In
                </h2>
                <div className="mt-1 mb-4">
                    <button onClick={() => navigate("/")}
                            className="text-sm text-green-600 hover:text-green-900 underline">
                        Go Back
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(authenticateUser)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-green-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register("username")}
                            className="mt-1 block px-3 py-2 w-full border border-green-200 rounded-md text-sm shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-green-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="mt-1 block px-3 py-2 w-full border border-green-200 rounded-md text-sm shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
