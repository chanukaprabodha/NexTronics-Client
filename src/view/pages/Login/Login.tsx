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
                            className="text-sm text-gray-500 hover:text-gray-700 underline cursor-pointer mt-3.5">CustomerDashboard
                    </button>
                </div>
            </form>
        </div>
    );
}*/

/*import {useNavigate} from "react-router-dom";
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

            console.log("User Credentials:", userCredentials);

            const response = await backendApi.post('/auth/login', userCredentials);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const user: UserData = getUserFromToken(accessToken);

            localStorage.setItem('username', user.username as string);
            localStorage.setItem('role', user.role as string);

            swal.fire({
                title: 'Login Successful',
                text: 'You have been logged in successfully.',
                icon: 'success',
                timer: 1000
            })

            console.log("User Role:", user.role);

            if (user.role === "customer" || null) {
                navigate('/customer-dashboard');
            }else {
                navigate('/admin-dashboard')
            }

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
}*/

/*import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { backendApi } from "../../../api.ts";
import swal from "sweetalert2";
import { getUserFromToken } from "../../../auth/auth.ts";
import type { User } from "../../../modal/User.ts";

type FormData = {
    username: string;
    password: string;
};

function LoginPage({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const authenticateUser = async (data: FormData) => {
        try {
            const userCredentials = {
                username: data.username,
                password: data.password
            };

            const response = await backendApi.post('/auth/login', userCredentials);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const user: User = getUserFromToken(accessToken);

            localStorage.setItem('username', user.name as string);
            localStorage.setItem('role', user.role as string);

            swal.fire({
                title: 'Login Successful',
                text: 'You have been logged in successfully.',
                icon: 'success',
                timer: 1000
            });

            if (user.role === "customer") {
                navigate('/customer-dashboard');
            } else {
                navigate('/admin-dashboard');
            }

        } catch (error) {
            console.error(error);
            swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid username or password. Please try again.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit(authenticateUser)} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                {...register("username")}
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                {...register("password")}
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={onSwitchToRegister}
                                className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RegisterPage({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                        <p className="text-gray-600">Join us today and get started</p>
                    </div>

                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                id="register-email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="register-password"
                                type="password"
                                placeholder="Create a password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                            />
                            <label className="ml-2 text-sm text-gray-600">
                                I agree to the{' '}
                                <a href="#" className="text-purple-600 hover:text-purple-500">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-purple-600 hover:text-purple-500">Privacy Policy</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-purple-600 hover:text-purple-500 font-medium"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Login() {
    const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

    const handleSwitchToRegister = () => setCurrentPage('register');
    const handleSwitchToLogin = () => setCurrentPage('login');

    return (
        <div>
            {currentPage === 'login' ? (
                <LoginPage onSwitchToRegister={handleSwitchToRegister} />
            ) : (
                <RegisterPage onSwitchToLogin={handleSwitchToLogin} />
            )}
        </div>
    );
}*/

import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import bcryp from "bcryptjs";
import {backendApi} from "../../../api.ts";
import swal from "sweetalert2";
import {getUserFromToken} from "../../../auth/auth.ts";
import type {User} from "../../../modal/User.ts";
import {IdGenerator} from "../../../utils/IdGenerator.ts";

type LoginFormData = {
    email: string;
    password: string;
};

type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    createdAt: string;
};

function LoginPage({onSwitchToRegister}: { onSwitchToRegister: () => void }) {
    const {register, handleSubmit} = useForm<LoginFormData>();
    const navigate = useNavigate();

    const authenticateUser = async (data: LoginFormData) => {
        try {
            const userCredentials = {
                email: data.email,
                password: data.password
            };

            console.log("User Credentials:", userCredentials);

            const response = await backendApi.post('/auth/login', userCredentials);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            if (!accessToken) {
                throw new Error("Access token is missing in the response");
            }

            localStorage.setItem('token', accessToken);

            const user: User = getUserFromToken(accessToken);

            localStorage.setItem('role', user.role as string);
            localStorage.setItem('name', user.name as string);

            swal.fire({
                title: 'Login Successful',
                text: 'You have been logged in successfully.',
                icon: 'success',
                timer: 1000
            });


            if (user.role === "customer") {
                navigate('/customer-dashboard');
            } else {
                navigate('/admin-dashboard');
            }

        } catch (error) {
            console.error(error);
            swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid username or password. Please try again.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit(authenticateUser)} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                {...register("email")}
                                type="text"
                                id="email"
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                {...register("password")}
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={onSwitchToRegister}
                                className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RegisterPage({onSwitchToLogin}: { onSwitchToLogin: () => void }) {
    const {register, handleSubmit, watch} = useForm<RegisterFormData>();
    const navigate = useNavigate();

    const handleRegister = async (data: RegisterFormData) => {
        if (data.password !== data.confirmPassword) {
            swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'Passwords do not match.'
            });
            return;
        }

        try {
            const userId = IdGenerator.generateId("USR");
            const hashedPassword = await bcryp.hash(data.password, 10);
            const response = await backendApi.post('/users/register', {
                id: userId,
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role || 'customer'
            });

            if (response.status === 201) {
                swal.fire({
                    title: 'Registration Successful',
                    text: 'Your account has been created successfully.',
                    icon: 'success',
                    timer: 1000
                });
            }

            navigate('/login'); // Redirect to login or another page after successful registration

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }catch (e) {
            console.error("Registration error:", e);
            swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'An error occurred during registration. Please try again.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                        <p className="text-gray-600">Join us today and get started</p>
                    </div>

                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                {...register("name")}
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select
                                {...register("role")}
                                id="role"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                {...register("password")}
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                {...register("confirmPassword")}
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-purple-600 hover:text-purple-500 font-medium"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Login() {
    const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

    const handleSwitchToRegister = () => setCurrentPage('register');
    const handleSwitchToLogin = () => setCurrentPage('login');

    return (
        <div>
            {currentPage === 'login' ? (
                <LoginPage onSwitchToRegister={handleSwitchToRegister}/>
            ) : (
                <RegisterPage onSwitchToLogin={handleSwitchToLogin}/>
            )}
        </div>
    );
}

