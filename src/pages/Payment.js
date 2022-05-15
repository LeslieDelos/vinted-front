import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ChekoutForm from "../components/ChekoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation().state;
  const { data } = location;
  console.log(data);
  const userToken = Cookies.get("userToken");
  // console.log(userToken);
  return userToken ? (
    <div>
      <div>
        <span>Nom de l'offre : </span> <span>{data.product_name}</span>
      </div>
      <div>
        <span>Prix de l'offre : </span> <span>{data.product_price} €</span>
      </div>
      <Elements stripe={stripePromise}>
        <ChekoutForm data={data} />
      </Elements>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
