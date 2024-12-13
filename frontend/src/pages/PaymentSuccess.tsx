import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simula una llamada al backend para procesar el pago
    const processPayment = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/payments/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentIntentId: "pi_example", // Obtén esto del frontend después de confirmar el pago
              paymentIntentClientSecret: "pi_example_secret", // Obtén el secret del cliente
              redirectStatus: "succeeded", // Asegúrate de que este estado provenga del pago
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          // Muestra el mensaje de éxito
          alert(data.message);
          // Redirige a la página de inicio
          navigate("/"); // Cambia '/' por la ruta de tu home si es diferente
        } else {
          // Si el pago no fue exitoso
          alert("Hubo un error con el pago.");
        }
      } catch (error) {
        console.error("Error al procesar el pago:", error);
      }
    };

    processPayment();
  }, [navigate]);

  return (
    <div>
      <h2>Procesando pago...</h2>
    </div>
  );
};

export default PaymentSuccess;
