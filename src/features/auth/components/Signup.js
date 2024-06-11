import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { } from 'react-router-dom';
import { createUserAsync, selectLoggedInUser } from '../AuthSlice';
import { useDispatch, useSelector } from "react-redux";

export default function Signup () {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

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
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />

                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create your account
                        </h2>
                        <form
                            noValidate
                            className="space-y-6"
                            onSubmit={handleSubmit((data) => {
                                console.log(/data/, data);
                                const result = dispatch(createUserAsync({
                                    email: data.email,
                                    password: data.password,
                                    addresses: [],
                                    role: 'user'
                                    //TODO: this role can be directly given on backend
                                }));
                                if (!result.error || !error) {
                                    navigate('/login'); // Redirect to login page
                                }
                            })}
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
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        {...register('password', {
                                            required: 'password is required',
                                            pattern: {
                                                value:
                                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                                message: `- at least 8 characters\n
                                              - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                                              - Can contain special characters`,
                                            },
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500">{errors.password.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        id="confirmPassword"
                                        {...register('confirmPassword', {
                                            required: 'confirm password is required',
                                            validate: (value, formValues) =>
                                                value === formValues.password || 'password not matching',
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create account
                                </button>
                            </div>

                            {status === 'loading' && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold leading-6 text-indigo-500 hover:text-black">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
