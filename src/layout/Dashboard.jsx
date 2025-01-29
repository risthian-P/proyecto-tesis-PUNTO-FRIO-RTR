import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import Navbar from '../layout/Navbar'

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const [localAuth, setLocalAuth] = useState(null);
    const autenticado = localStorage.getItem('token');

    useEffect(() => {
        if (auth?.nombre || auth?.rol) {
            setLocalAuth(auth);
        }
    }, [auth]);

    if (!autenticado) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar userRole={localAuth?.rol} />
            <div className="flex-1 overflow-y-scroll p-8 bg-[#F7F3E9]">
                <Outlet />
            </div>
            <div className="bg-gradient-to-l from-[#2bb192] via-[#97b867] to-[#2bb192] h-12">
                <p className="text-center text-white leading-[2.9rem] underline">
                    Todos los derechos reservados
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
