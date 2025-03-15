import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';

export default function Paypal() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        marginTop: "-80px", 
      }}
    >
      <PayPalButtons
        style={{
          layout: "horizontal",
          color: "gold",
          shape: "rect",
          label: "paypal",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '10.00',
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            setTimeout(() => {
              toast.success('Pago exitoso');
            }, 1000); 
          });
        }}
        onError={(err) => {
          toast.error('Error en el pago');
          console.error(err);
        }}
      />
    </div>
  );
}