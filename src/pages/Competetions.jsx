import { json, useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import axios from "axios";
import { useState } from "react";
import ErrorModal from "../components/ErrorModal";
const columns = [
  { field: "competition_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "country_name",
    headerName: "Country Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 200,
    editable: true,
  },
  {
    field: "sub_type",
    headerName: "Sub Type",
    width: 200,
    editable: true,
  },
  {
    field: "url",
    headerName: "URL",
    sortable: false,
    width: 200,
  },
];
const CompetetionsPage = () => {
  const loaderData = useLoaderData();
  const [modal, setModal] = useState(null);
  columns[0].renderCell = (params) => (
    <strong
      onClick={() => getClubsCount(params.row.competition_id)}
      className="cPntr"
    >
      {params.row.competition_id}
    </strong>
  );
   
  const getClubsCount = async (competetionId) => {
    try {
      const response = await axios.get(
        "http://localhost:5038/competetion/count",
        {
          params: {
            competetionId: competetionId,
          },
        }
      );
      const clubsCount = response.data.clubsCount;
      setModal({
        title: "Competetion Clubs",
        message: [`Number of Clubs: ${
          clubsCount.length > 0 ? clubsCount[0].count : `0`
        }`],
      });
    } catch (error) {
      console.error(
        `Error fetching number of clubs for ${competetionId}:`,
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
      <Table data={loaderData} columns={columns} pkey="competition_id" />
    </>
  );
};
export default CompetetionsPage;

export async function loader() {
  try {
    const response = await axios.get("http://localhost:5038/competetions");
    return response.data;
  } catch (error) {
    console.error(
      "Error occured while fetching competetions data ",
      error.message
    );
    throw json(
      { message: "Could not fetch competetions data" },
      {
        status: 500,
      }
    );
  }
}
