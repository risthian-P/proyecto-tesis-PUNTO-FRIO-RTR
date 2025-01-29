import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineTags, AiOutlineAppstore, AiOutlineDatabase, AiOutlineUsergroupAdd, AiOutlineCreditCard, AiOutlineUser, AiOutlineSetting, AiOutlineKey, AiOutlineLogout } from 'react-icons/ai';
import { FaBeer } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ userRole }) => {
    const [nav, setNav] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const urlActual = location.pathname;

    const handleNav = () => {
        setNav(!nav);
    };

    const handleUserMenuToggle = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const navItems = [
        { id: 1, text: 'Facturación', route: '/dashboard/CajaDeVenta', icon: <AiOutlineCreditCard />, visibleTo: 'cajero' },
        { id: 2, text: 'Usuarios', route: '/usuarios', icon: <AiOutlineUsergroupAdd />, visibleTo: 'administrador' },
        { id: 3, text: 'Categorías', route: '/categories', icon: <AiOutlineTags />, visibleTo: 'administrador' },
        { id: 4, text: 'Productos', route: '/productos', icon: <AiOutlineAppstore />, visibleTo: 'administrador' },
        { id: 5, text: 'Inventario', route: '/inventario', icon: <AiOutlineDatabase />, visibleTo: 'administrador' },
        { id: 6, text: 'Clientes', route: '/clientes', icon: <AiOutlineUsergroupAdd />, visibleTo: 'cajero' },
        { id: 7, text: 'Envases', route: '/envases', icon: <FaBeer />, visibleTo: 'cajero' }
    ];

    const userOptions = [
        { id: 1, text: 'Ver Perfil', route: '/perfil', icon: <AiOutlineUser /> },
        { id: 2, text: 'Actualizar Perfil', route: '/actualizar-perfil', icon: <AiOutlineSetting /> },
        { id: 3, text: 'Actualizar Contraseña', route: '/actualizar-contrasena', icon: <AiOutlineKey /> },
        { id: 4, text: 'Cerrar Sesión', route: '/logout', icon: <AiOutlineLogout />, onClick: handleLogout},
    ];

    return (
        <div className="bg-black flex justify-between items-center h-20 w-full px-6 text-white relative">
            <div className="flex items-center justify-center space-x-4">
                <img
                    src="https://res.cloudinary.com/dkhh1qdbr/image/upload/v1738133108/c9bcfadl6ejdm2ohhpdf.png"
                    alt="Logo"
                    className="w-16 h-16"
                />
                <button onClick={handleNav} className="md:hidden">
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </button>
            </div>

            <ul className="hidden md:flex flex-grow justify-center space-x-6">
                {navItems
                    .filter((item) => item.visibleTo === userRole)
                    .map((item) => {
                        const isActive = urlActual.startsWith(item.route);
                        return (
                            <li
                                key={item.id}
                                className={`p-4 rounded-xl cursor-pointer duration-300 flex items-center space-x-2 ${
                                    isActive ? 'bg-[#B2FFFF] text-black' : 'hover:bg-[#B2FFFF] hover:text-black'
                                }`}
                                onClick={item.onClick}
                            >
                                {item.icon} <span>{item.text}</span>
                            </li>
                        );
                    })}
            </ul>

            <div className="relative">
                <button onClick={handleUserMenuToggle} className="flex items-center p-2 rounded-full cursor-pointer">
                    <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="Usuario" className="w-10 h-10 rounded-full" />
                </button>
                {userMenuOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg">
                        {userOptions.map((option) => (
                            <li
                                key={option.id}
                                className="flex items-center p-3 cursor-pointer hover:bg-[#B2FFFF] hover:text-black rounded-lg"
                                onClick={option.onClick}
                            >
                                {option.icon} <span className="ml-2">{option.text}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className={`fixed top-0 left-0 w-[70%] h-full bg-[#000300] border-r border-gray-900 transition-transform duration-500 ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center p-4">
                    <img
                        src="https://res.cloudinary.com/dkhh1qdbr/image/upload/v1738133108/c9bcfadl6ejdm2ohhpdf.png"
                        alt="Logo"
                        className="w-10 h-10 md:w-16 md:h-16"
                    />
                    <button onClick={handleNav} className="text-white">
                        <AiOutlineClose size={20} />
                    </button>
                </div>
                {navItems
                    .filter((item) => item.visibleTo === userRole)
                    .map((item) => {
                        const isActive = urlActual.startsWith(item.route);
                        return (
                            <li
                                key={item.id}
                                className={`p-4 border-b rounded-xl cursor-pointer duration-300 border-gray-600 flex items-center space-x-2 ${
                                    isActive ? 'bg-[#B2FFFF] text-black' : 'hover:bg-[#B2FFFF] hover:text-black'
                                }`}
                                onClick={item.onClick}
                            >
                                {item.icon} <span>{item.text}</span>
                            </li>
                        );
                    })}
            </div>
        </div>
    );
};

export default Navbar;
