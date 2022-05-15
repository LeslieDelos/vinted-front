import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  // const params = useParams();
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div>
      <h2>{data.product_name}</h2>
      <div>
        {data.product_details.map((item, index) => {
          const keyName = Object.keys(item);

          return (
            <div key={index}>
              <spans>{keyName[0]}</spans> <span>{item[keyName[0]]}</span>
            </div>
          );
        })}
      </div>
      <Link to="/payment" state={{ data: data }}>
        Acheter
      </Link>
    </div>
  );
};

export default Offer;
