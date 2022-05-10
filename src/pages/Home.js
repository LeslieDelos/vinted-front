import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div>
      {data.offers.map((offer) => {
        // console.log(offer._id);
        return (
          <Link to={`/offer/${offer._id}`} key={offer._id}>
            <div className="card">
              <h2>{offer.product_name}</h2>
              <img
                style={{ height: 150 }}
                src={offer.product_image.secure_url}
                alt=""
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
