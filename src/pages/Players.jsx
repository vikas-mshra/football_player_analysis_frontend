import axios from "axios";
import { useState } from "react";
import { json, useLoaderData } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";
import Table from "../components/Table";

const columns = [
  { field: "player_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "image_url",
    headerName: "Pic",
    width: 100,
  },
  {
    field: "current_club_name",
    headerName: "Club Name",
    width: 150,
  },
  {
    field: "position",
    headerName: "Position",
    width: 70,
    editable: true,
  },
  {
    field: "highest_market_value_in_eur",
    headerName: "MarketValue (in euro)",
    type: "number",
    width: 200,
  },
  {
    field: "country_of_birth",
    headerName: "Citizenship",
    sortable: true,
    width: 100,
  },
];
const PlayersPage = () => {
  const loaderData = useLoaderData();
  const [modal, setModal] = useState(null);

  columns[2].renderCell = (params) => (
    <img
      className="cPntr"
      src={params.row.image_url}
      alt="Italian Trulli"
      onClick={() => getPlayerGoalsCount(params.row)}
    />
  );
  const handleCellEditCommit = async (params, event) => {
    const { id, field } = params;
    const { value } = event.target;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URI}/updatePlayer/${id}`,
        {
          [field]: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setModal({
          title: "Success",
          message: [response.data.message],
          isPlayerData: null,
        });
      }
    } catch (error) {
      console.error(
        `Error updating the player ${params.row.player_id}:`,
        error
      );
    }

    console.log(
      `Cell at row ID: ${id} and field ${field} changed to: ${value}`
    );
  };
  const addToFavourites = async (playerId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URI}/addToFavourite`,
        {
          newDocument: { player_id: playerId },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(`Error fetching club name for player ${playerId}:`, error);
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
      const playerId = player.player_id;
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URI}/playerStatus/${playerId}`
      );
      let isPlayerFavourite = true;

      if ("message" in resp.data) {
        isPlayerFavourite = false;
      }
      setModal({
        title: "Player Goals",
        message: [
          `Number of goals: ${goalsCount[0]?.count ?? "0"}`,
          `Number of appearances: ${appearanceCount[0]?.count ?? "0"}`,
        ],
        playerId: player.player_id,
        isPlayerFavourite,
        isPlayerData: true,
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
          onClickFavourite={addToFavourites}
          isPlayerData={modal.isPlayerData}
          isPlayerFavourite={modal.isPlayerFavourite}
          playerId={modal.playerId}
        />
      )}
      <Table
        data={loaderData}
        columns={columns}
        rowHeight={100}
        pkey="player_id"
        handleCellEditCommit={handleCellEditCommit}
      />
    </>
  );
};
export default PlayersPage;

export async function loader() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/topPlayers`
    ); // Assuming 3195 is the player ID
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
