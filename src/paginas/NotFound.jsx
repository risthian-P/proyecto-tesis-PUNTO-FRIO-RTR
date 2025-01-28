import logoDismiss from '../assets/cashier-6739527_1280.jpg'
import {Link} from 'react-router-dom'

export const NotFound = () => {

    return (
        
        <div className="flex flex-col items-center justify-center">

            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDismiss} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Página no encontrada</p>
                
                <p className="md:text-lg text-center lg:text-xl text-gray-600 mt-8">Lo lamentamos, es posible que la dirección ingresada este fuera de servicio o no ha ingresado correctamente</p>
                
                <Link to="/login" className="p-3 m-5 w-full text-center  bg-gray-600 text-slate-300  border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Inicio de sesión</Link>

            </div>
        </div>
    )
}
