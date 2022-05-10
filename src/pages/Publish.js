import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", state);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return userToken ? (
    <form className="publish">
      {!picture ? (
        <div>
          <input
            id="file"
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
        </div>
      ) : (
        <img src={URL.createObjectURL(picture)} alt="" />
      )}

      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      ></textarea>

      <input
        type="text"
        placeholder="Marque"
        value={brand}
        onChange={(event) => setBrand(event.target.value)}
      />
      <input
        type="text"
        placeholder="Taille"
        value={size}
        onChange={(event) => setSize(event.target.value)}
      />
      <input
        type="text"
        placeholder="Couleur"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      />
      <input
        type="text"
        placeholder="Etat"
        value={state}
        onChange={(event) => setState(event.target.value)}
      />
      <input
        type="text"
        placeholder="Lieu"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <button onClick={handleSubmit}>Ajouter</button>
    </form>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
