import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../auth/AuthSlice';

export default function UserProfile () {
    const user = useSelector(selectLoggedInUser);

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
        </div>
    );
}