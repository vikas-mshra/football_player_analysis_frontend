import { json, useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import axios from "axios";
import { useState } from "react";
import ErrorModal from "../components/ErrorModal";
import Button from "../components/ui/Button";
const columns = [
  { field: "player_id", width: 90, renderHeader: () => <b>ID</b> },
  {
    field: "name",
    renderHeader: () => <b>Name</b>,
    width: 150,
    editable: true,
  },
  {
    field: "image_url",
    headerAlign: "center",
    renderHeader: () => <b>Pic</b>,
    width: 100,
  },
  {
    field: "current_club_name",
    headerAlign: "center",
    renderHeader: () => <b>Club Name</b>,
    width: 150,
  },
  {
    field: "position",
    headerAlign: "center",
    renderHeader: () => <b>Position</b>,
    width: 70,
    editable: true,
  },
  {
    field: "market_value_in_eur",
    headerAlign: "center",
    renderHeader: () => <b>MarketValue (in euro)</b>,
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "country_of_birth",
    headerAlign: "center",
    renderHeader: () => <b>Citizenship</b>,
    sortable: true,
    width: 100,
  },
  {
    field: "Action",
    renderHeader: () => <strong>Action</strong>,
    width: 100,
    headerAlign: "center",
    align: "center",
    sortable: false,
    editable: false,
    disableColumnMenu: true,
  },
];
const FavouritesPage = () => {
  const loaderData = useLoaderData();
  const [data, setData] = useState(loaderData);
  const [modal, setModal] = useState(null);

  columns[2].renderCell = (params) => (
    <img
      className="cPntr"
      src={params.row.image_url}
      alt="Italian Trulli"
      onClick={() => getPlayerGoalsCount(params.row)}
    />
  );
  columns[7].renderCell = (params) => (
    <div>
      <Button
        width="auto"
        onClick={() => removeFavouritePlayer(params.row.player_id)}
      >
        Delete
      </Button>
    </div>
  );

  const removeFavouritePlayer = async (playerId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/removePlayer/${playerId}`
      );
      console.log(response);
      if (response.status === 200) {
        setModal({
          title: "Success",
          message: [response.data.message],
        });
        console.log(data);
        setData((prevState) => {
          return prevState.filter((obj) => obj.player_id !== playerId);
        });
      } else
        setModal({
          title: "Error occured",
          message: ["Try again after sometime"],
        });
    } catch (error) {
      console.error(`Error occured while removing player ${playerId}:`, error);
      setModal({
        title: "Error occured",
        message: ["Player doesn't exist"],
      });
    }
  };
  const getPlayerGoalsCount = async (player) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/goals/count`,
        {
          params: {
            playerID: player.player_id,
            goalType: "Goals",
          },
        }
      );
      const goalsCount = response.data.goalsCount;

      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}/appearance/count`,
        {
          params: {
            playerID: player.player_id,
          },
        }
      );
      const appearanceCount = res.data.appearanceCount;

      setModal({
        title: "Player Goals",
        message: [
          `Number of goals: ${goalsCount[0].count}`,
          `Number of appearances: ${appearanceCount[0].count}`,
        ],
        playerId: player.player_id,
      });
    } catch (error) {
      console.error(
        `Error fetching club name for player ${player.player_id}:`,
        error
      );
    }
  };
  return (
    <>
      {modal && (
        <ErrorModal
          title={modal.title}
          message={modal.message}
          onConfirm={() => setModal(null)}
        />
      )}
      <Table data={data} columns={columns} rowHeight={100} pkey="player_id" />
    </>
  );
};
export default FavouritesPage;

export async function loader() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/favouritePlayers`
    );
    return response.data;
  } catch (error) {
    console.error("Error occured while fetching players data ", error.message);
    throw json(
      { message: "Could not fetch players data" },
      {
        status: 500,
      }
    );
  }
}
