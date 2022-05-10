import { Link } from "react-router-dom";

const Header = ({ handleToken, userToken }) => {
  return (
    <div>
      <p>Logo</p>
      {!userToken ? (
        <>
          <Link to="/login">
            <button>Connexion</button>
          </Link>
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
        </>
      ) : (
        <button
          onClick={() => {
            handleToken();
          }}
        >
          Déconnexion
        </button>
      )}
      <Link to="/publish">Articles à vendre</Link>
    </div>
  );
};

export default Header;
