import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>Welcome</header>
      <div className="dFlx m10px jCntSEven">
        <Button width="auto" onClick={() => navigate("/players")}>
          Players
        </Button>
        <Button width="auto" onClick={() => navigate("/clubs")}>
          Clubs
        </Button>
        <Button width="auto" onClick={() => navigate("/competetions")}>
          Competetions
        </Button>
      </div>
      <div className="dFlx m10px jCntSEven">
        <Button width="auto" onClick={() => navigate("/favourites")}>
          Favourites
        </Button>
        <Button width="auto" onClick={() => navigate("/newplayer")}>
          Add Player
        </Button>
      </div>
    </div>
  );
};
export default WelcomePage;
