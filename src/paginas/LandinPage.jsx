import logoDarkMode from '../assets/dark.png'
import logoFacebook from '../assets/facebook.png'
import logoinvitados from '../assets/82092848_l_normal_none.webp'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div>
            {/* Header */}
            <header className="bg-[#337bb3] text-white py-6">
                <div className="container mx-auto flex justify-between items-center">
                    <img
                        src="https://res.cloudinary.com/dkhh1qdbr/image/upload/v1738133108/c9bcfadl6ejdm2ohhpdf.png"
                        alt="Punto Frío Logo"
                        className="w-24 h-24"
                    />
                    <nav>
                        <ul className="flex space-x-8">
                            {/* Login Button */}
                            <li>
                                <Link
                                    to="/login"
                                    className="bg-[#2bb192] text-white py-2 px-6 rounded-full hover:bg-[#97b867] transition"
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://your-image-url.com')" }}>
                <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Bienvenido a Punto Frío</h1>
                        <p className="text-xl mb-6">Sistema de gestión de ventas e inventario para tu negocio de cervezas.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#337bb3] text-white py-4 text-center">
                <p>© {new Date().getFullYear()} Punto Frío R.T.T. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
