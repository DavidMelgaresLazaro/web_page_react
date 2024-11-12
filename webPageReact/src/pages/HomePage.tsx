import BO6_image from "../images/BO6_image.jpg";
import farming_25_image from "../images/farming_25_image.jpg"


function HomePage() {
  return (
    <>
      <div>

      </div>
      <div>
        <h1 className="mx-auto">Juegos Nuevos</h1>
        <div className="flex space-x-4 justify-start">
          <img src={BO6_image} alt="BO6" />
          <img src={farming_25_image} alt="farming_25_image" />
          <img src={BO6_image} alt="BO6" />

        </div>

      </div>
    </>
  )
}

export default HomePage