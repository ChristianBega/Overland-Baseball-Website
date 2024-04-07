import React from "react";
import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
import { Container } from "@mui/material";
import CMSSchedule from "../schedule";
// import { addScheduleItem } from "../../../setup/utils/firebase/addItem";
import { Link } from "react-router-dom";

// const scheduleItem = {
//   date: "",
//   time: "",
//   opponent: "",
//   opponentIcon: "",
//   location: "",
//   home: "", // boolean
//   away: "", // boolean
// };
// const buttonActions = {
//   schedule: (uid, role) => addScheduleItem(uid, role, scheduleItem),
// };

const CMSEditPage = () => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  // let role = queryParams.get("role");
  // let uid = queryParams.get("uid");

  const btnTypeName = type[0].toUpperCase() + type.slice(1);

  // const handleAdd = async (e) => {
  //   const buttonType = e.target.dataset.btntype;
  //   try {
  //     const result = await buttonActions[buttonType](uid, role);
  //     console.log(result);
  //   } catch (error) {
  //     console.error("Failed to add schedule item:", error);
  //   }
  // };
  return (
    <Container>
      {/* <button onClick={handleAdd} data-btnType={type}> */}
      <Link to="/cms-create">Add New {btnTypeName} Item</Link>
      {/* </button> */}
      <button>Remove {btnTypeName} Item</button>
      <button>Edit {btnTypeName} Item</button>

      {type === "schedule" && <CMSSchedule />}
    </Container>
  );
};

export default CMSEditPage;
