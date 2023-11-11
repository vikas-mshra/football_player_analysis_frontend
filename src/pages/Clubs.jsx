import { json, useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import axios from "axios";
const columns = [
  { field: "club_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "squad_size",
    headerName: "Squad",
    width: 150,
  },
  {
    field: "stadium_name",
    headerName: "Stadium Name",
    width: 200,
    editable: true,
  },
  {
    field: "net_transfer_record",
    headerName: "Total Amount Spend",
    width: 200,
    editable: true,
  },
  {
    field: "last_season",
    headerName: "Last Season",
    sortable: true,
    width: 100,
  },
];
const ClubsPage = () => {
  const loaderData = useLoaderData();
  return <Table data={loaderData} columns={columns} pkey="club_id" />;
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
