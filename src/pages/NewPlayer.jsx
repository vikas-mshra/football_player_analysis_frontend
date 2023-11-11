import axios from "axios";
import { useState } from "react";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Select } from "../components/ui/Select";

const NewPlayerPage = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [marketValue, setMarketValue] = useState();
  const [clubId, setClubId] = useState();
  const [position, setPostion] = useState();
  const [citizenship, setCitizenship] = useState();
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const onChange = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/getMaxPlayerId`
      );
      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}/clubDetails/${clubId}`
      );

      const playerId = parseInt(response.data[0].player_id);
      const clubName = res.data.name;
      const domesticCompetetionId = res.data.domestic_competition_id;

      const playerAdded = await axios.post(
        `${process.env.REACT_APP_API_URI}/addPlayer`,
        {
          newDocument: {
            player_id: playerId + 1,
            first_name: firstName,
            last_name: lastName,
            name: firstName + " " + lastName,
            highest_market_value_in_eur: parseInt(marketValue),
            position,
            current_club_id: clubId,
            country_of_citizenship: citizenship,
            country_of_birth: citizenship,
            market_value_in_eur: parseInt(marketValue),
            current_club_name: clubName,
            current_club_domestic_competition_id: domesticCompetetionId,
            image_url:
              "https://img.a.transfermarkt.technology/portrait/header/s_3195_512_2013_03_08_1.jpg?lm=1",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("player added successfully");
      setModal({
        title: "Success",
        message: ["Player successfully created!"],
      });
    } catch (error) {
      console.error(
        "Error occured while fetching players data ",
        error.message
      );
      throw json(
        { message: "Could not fetch players data" },
        {
          status: 500,
        }
      );
    }
  };
  return (
    <div>
      {modal && (
        <ErrorModal
          title={modal.title}
          message={modal.message}
          onConfirm={() => {
            setModal(null);
            navigate("/");
          }}
        />
      )}
      <div className="row-align">
        <Label
          htmlFor="firstName"
          title="First Name"
          width="170px"
          required={true}
        />
        <Input
          type="text"
          value={firstName}
          id="firstName"
          name="firstName"
          onChange={(event) => setFirstName(event.target.value)}
          width="170px"
        />
      </div>
      <div className="row-align analysis_step_one_form_block">
        <Label
          htmlFor="lastName"
          title="Last Name"
          width="170px"
          required={true}
        />
        <Input
          type="text"
          value={lastName}
          id="lastName"
          name="lastName"
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div className="row-align analysis_step_one_form_block">
        <Label
          htmlFor="marketValue"
          title="Market Value"
          required={true}
          width="170px"
        />
        <Input
          type="text"
          value={marketValue}
          id="marketValue"
          name="marketValue"
          onChange={(event) => setMarketValue(event.target.value)}
        />
      </div>
      <div className="row-align analysis_step_one_form_block">
        <Label htmlFor="clubId" title="Club Id" required={true} width="170px" />
        <Select
          id="clubId"
          name="clubId"
          value={clubId}
          onChange={(event) => setClubId(event.target.value)}
          selectedValue="Select Club Id"
          data={loaderData.clubIds}
        />
      </div>
      <div className="row-align analysis_step_one_form_block">
        <Label
          htmlFor="position"
          title="Position"
          required={true}
          width="170px"
        />
        <Select
          id="position"
          name="position"
          value={position}
          onChange={(event) => setPostion(event.target.value)}
          selectedValue="Select Position"
          data={["Attack", "Defense", "Midfield"]}
        />
      </div>
      <div className="row-align analysis_step_one_form_block">
        <Label
          htmlFor="citizenship"
          title="Citizenship"
          required={true}
          width="170px"
        />
        <Select
          id="citizenship"
          name="citizenship"
          value={citizenship}
          onChange={(event) => setCitizenship(event.target.value)}
          selectedValue="Select Citizenship"
          data={[
            "India",
            "China",
            "South Korea",
            "Japan",
            "USA",
            "Spain",
            "Portugal",
          ]}
        />
      </div>
      <div className="row-align">
        <button onClick={onChange}>Submit</button>
      </div>
    </div>
  );
};

export default NewPlayerPage;

export async function loader() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/getClubIds`
    ); // Assuming 3195 is the player ID
    return {
      clubIds: response.data,
    };
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
