import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../AuthSlice';

function ProtectedAdmin ({ children }) {
    const user = useSelector(selectLoggedInUser);

    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>;
    }
    if (user && user.role !== 'admin') {
        console.log(/inNotAdmin/, user.role !== 'admin');
        return <Navigate to="/" replace={true}></Navigate>;
    }
    return children;
}

export default ProtectedAdmin