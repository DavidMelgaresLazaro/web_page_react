import BO6_image from '../images/BO6_image.jpg';
import farming_25_image from '../images/farming_25_image.jpg';

function JuegosNuevos() {
    return (
        <div>
            <h1 className="text-center text-2xl font-bold mb-4">Juegos Nuevos</h1>
            <div className="flex w-full gap-x-2">
                
                <img 
                  src={BO6_image} 
                  alt="BO6" 
                  className="flex-grow object-contain w-1/3 h-auto" 
                />
                <img 
                  src={farming_25_image} 
                  alt="farming_25_image" 
                  className="flex-grow object-contain w-1/3 h-auto" 
                />
                <img 
                  src={BO6_image} 
                  alt="BO6" 
                  className="flex-grow object-contain w-1/3 h-auto" 
                />
            </div>
        </div>
    );
}

export default JuegosNuevos;

