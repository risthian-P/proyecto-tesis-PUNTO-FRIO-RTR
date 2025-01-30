import { useState } from 'react'
import { Link } from 'react-router-dom'

export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div>
            {/* Hero Section */}
            <section 
                id="home" 
                className="h-screen bg-cover bg-center relative" 
                style={{ backgroundImage: "url('https://res.cloudinary.com/dkhh1qdbr/image/upload/v1738198104/domoiid5dmes2qaequyu.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="flex justify-center items-center h-full text-center text-white relative z-10">
                    <div>
                        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Bienvenido al Punto Frío R.T.R.</h1>
                        
                        {/* Logo entre los textos */}
                        <img
                            src="https://res.cloudinary.com/dkhh1qdbr/image/upload/v1738133108/c9bcfadl6ejdm2ohhpdf.png"
                            alt="Punto Frío Logo"
                            className="w-36 h-36 mx-auto mb-6"
                        />
                        
                        <p className="text-lg mb-8">Sistema de gestión de ventas e inventario para tu negocio de bebidas refrescantes.</p>
                        
                        {/* Login Button */}
                        <Link
                            to="/login"
                            className="bg-[#59d8d4] text-black font-bold py-3 px-8 rounded-full hover:bg-[#b2ffff] transition-all duration-300 transform hover:scale-105"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer - sin fondo, sobre la misma imagen */}
            <footer className="text-white py-4 text-center absolute bottom-0 left-0 w-full bg-black bg-opacity-50">
                <p className="text-sm">© {new Date().getFullYear()} Punto Frío R.T.T. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
