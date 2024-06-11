import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../auth/AuthSlice';

export default function UserProfile () {
    const user = useSelector(selectLoggedInUser);

    return (
        <div>
            <div className="mx-auto mt-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                        Name: {user.name ? user.name : 'New User'}
                    </h1>
                    <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                        email address : {user.email}
                    </h3>
                    {user.role === 'admin' && (
                        <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                            role : {user.role}
                        </h3>
                    )}
                </div>

            </div>
        </div>
    );
}