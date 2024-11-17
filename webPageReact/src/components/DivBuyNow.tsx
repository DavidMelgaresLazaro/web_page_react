function DivBuyNow() {
    return (
        <div className="bg-indigo-600 w-full" style={{ height: '75vh' }}>
            <div className="flex h-full">
                {/* Lado izquierdo con el texto */}
                <div className="w-1/2 flex items-center justify-center p-4">
                    <div className="text-center">
                        <p className="text-white text-4xl font-bold mb-4">¡Descubre nuevos juegos!</p>
                        <p className="text-white text-xl">Compra ya y comienza la aventura.</p>
                    </div>
                </div>

                {/* Lado derecho con la imagen */}
                <div className="w-1/2 flex items-center justify-center p-4">
                    <img 
                        src="https://picsum.photos/id/400/400/400" 
                        alt="Juegos" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default DivBuyNow;
