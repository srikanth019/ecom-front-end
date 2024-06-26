import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser, checkUserAsync, selectError } from '../AuthSlice';
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Login () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(selectLoggedInUser);
    const error = useSelector(selectError)
    const [eyeIcon, setEyeIcon] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            {user && <Navigate to="/" replace={true}></Navigate>}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="/ecommerce.png"
                        alt="Your Company"
                    />

                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Login
                        </h2>
                        <form
                            noValidate
                            onSubmit={handleSubmit((data) => {
                                // console.log(/data/, data);
                                dispatch(
                                    checkUserAsync({ email: data.email, password: data.password })
                                );

                                if (user && user.role !== 'admin') {
                                    navigate('/')
                                } else if (user && user.role === 'admin') {
                                    navigate('/admin');
                                }

                            })}
                            className="space-y-6"
                            action="#"
                            method="POST"
                        >
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        {...register('email', {
                                            required: 'email is required',
                                            pattern: {
                                                // eslint-disable-next-line no-useless-escape
                                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                                message: 'email not valid',
                                            },
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={eyeIcon ? 'text' : 'password'}
                                        {...register('password', {
                                            required: 'password is required',
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 pr-7 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="absolute right-2 top-2" onClick={() => setEyeIcon((prev) => !prev)}>{eyeIcon ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}</span>
                                    <div className="text-sm mt-1">
                                        <Link
                                            to="/forgot-password"
                                            className="font-semibold text-indigo-600 hover:text-indigo-400"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500">{errors.password.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Login
                                </button>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <Link to={"/signup"} className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div >
            </div >
        </>
    );
}
