import { json, useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import axios from "axios";
import ErrorModal from "../components/ErrorModal";
import { useState } from "react";
const columns = [
  { field: "club_id", renderHeader: () => <b>ID</b>, width: 90 },
  {
    field: "name",
    renderHeader: () => <b>Name</b>,
    width: 150,
    editable: true,
  },
  {
    field: "squad_size",
    renderHeader: () => <b>Squad</b>,
    width: 150,
  },
  {
    field: "stadium_name",
    renderHeader: () => <b>Stadium Name</b>,
    width: 200,
    editable: true,
  },
  {
    field: "net_transfer_record",
    renderHeader: () => <b>Total Amount Spend</b>,
    width: 200,
    editable: true,
  },
  {
    field: "last_season",
    renderHeader: () => <b>Last Season</b>,
    sortable: true,
    width: 100,
  },
];
const ClubsPage = () => {
  const loaderData = useLoaderData();
  const [modal, setModal] = useState(null);

  columns[1].renderCell = (params) => (
    <strong onClick={() => getAllPlayers(params.row.club_id)} className="cPntr">
      {params.row.name}
    </strong>
  );
  const getAllPlayers = async (clubId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/getAllPlayers/${clubId}`
      );
      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}/clubGames/count/${clubId}`
      );

      const players = response.data;
      const { gamesCount } = res.data;
      setModal({
        title: "Club Details",
        message: [`Number of Games: ${gamesCount}`, players],
      });
    } catch (error) {
      console.error(`Error fetching players for ${clubId}:`, error);
      setModal({
        title: "Error Occures",
        message: [`Error fetching players for ${clubId}:`, error],
      });
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
      <Table data={loaderData} columns={columns} pkey="club_id" />
    </>
  );
};
export default ClubsPage;

export async function loader() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URI}/clubs`);
    return response.data;
  } catch (error) {
    console.error("Error occured while fetching clubs data ", error.message);
    throw json(
      { message: "Could not fetch clubs data" },
      {
        status: 500,
      }
    );
  }
}
