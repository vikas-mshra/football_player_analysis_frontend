import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayoutPage from "./pages/RootLayout";
import WelcomePage from "./pages/Welcome";
import PlayersPage, { loader as getPlayersData, loader } from "./pages/Players";
import ClubsPage, { loader as getClubsData } from "./pages/Clubs";
import CompetetionsPage, {
  loader as getCompetetionsData,
} from "./pages/Competetions";
import FavouritesPage, {
  loader as getFavouritesPlayersData,
} from "./pages/Favourites";
import NewPlayerPage, {loader as getClubsIdData} from "./pages/NewPlayer";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayoutPage />,
      children: [
        {
          index: true,
          element: <WelcomePage />,
        },
        {
          path: "players",
          element: <PlayersPage />,
          loader: getPlayersData,
        },
        {
          path: "clubs",
          element: <ClubsPage />,
          loader: getClubsData,
        },
        {
          path: "competetions",
          element: <CompetetionsPage />,
          loader: getCompetetionsData,
        },
        {
          path: "favourites",
          element: <FavouritesPage />,
          loader: getFavouritesPlayersData,
        },
        {
          path: "newplayer",
          element: <NewPlayerPage />,
          loader: getClubsIdData
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
