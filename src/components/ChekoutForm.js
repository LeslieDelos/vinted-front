import { useStripe, useElements, Card } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (event) => {};
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <input type="submit" value="Acheter" />
    </form>
  );
};

export default CheckoutForm;
