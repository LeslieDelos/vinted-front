import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ data }) => {
  const [disabled, setDisabled] = useState(false);

  const elements = useElements();
  const stripe = useStripe();

  const handlePayment = async (event) => {
    event.preventDefault();
    setDisabled(true);

    try {
      //Récupérer les données bancaires
      const cardElement = elements.getElement(CardElement);
      //envoyer ces données à l'api Stripe
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "Leslie",
      });
      //console.log(stripeResponse);
      const stripToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripToken,
          amount: data.product_price,
          title: data.product_name,
        }
      );
      console.log(response.data);
      setDisabled(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <input type="submit" value="Pay" disabled={disabled} />
    </form>
  );
};

export default CheckoutForm.js;
