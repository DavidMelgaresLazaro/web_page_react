import BO6_image from '../images/BO6_image.jpg';
import farming_25_image from '../images/farming_25_image.jpg';
import Product from './product.tsx';


// A div displaying images of the 3 newest games (The database is not implemented yet).

function JuegosNuevos() {
    return (
        <div>
            <h1 className="text-center text-2xl font-bold mb-4">Juegos Nuevos</h1>
            <div className="product-list flex space-x-4">
             <Product
                name="Black Ops 6"
                price={29.99}
                imageUrl= {BO6_image}
              />
                 <Product
             name="Farming simulator 25"
              price={19.99}
                imageUrl={farming_25_image}
                />
                
                <Product
             name="Farming simulator 25"
              price={19.99}
                imageUrl={farming_25_image}
                />
                
                <Product
             name="Farming simulator 25"
              price={19.99}
                imageUrl={farming_25_image}
                />
                
                <Product
             name="Farming simulator 25"
              price={19.99}
                imageUrl={farming_25_image}
                />
      
            </div>
        </div>
    );
}

export default JuegosNuevos;

