import React from "react";
import { Typography, Stack, Box, TextField, Button, useMediaQuery, List, ListItem } from "@mui/material";
import { StyledCmsItem, StyledCmsItemContainer, StyledList, StyledVerticalDivider } from "./index.styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import { useUrlQueryParams } from "../../../../setup/utils/helpers/useUrlQueryParams";
import { useModal } from "../../../../setup/context/useCmsModal";
import CmsModal from "../cmsModal";
import { updateCMSItem } from "../../../../setup/utils/firebase/editItem";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import ScheduleItem from "../../../unauthorized/home/components/scheduleItem/scheduleItem.component";
import TeamRoosterItem from "../../../unauthorized/roster/components/teamRosterItem/teamRosterItem.component";

const CmsListItem = ({ values, indexz, id, activeIndex, isActive, onItemClick, setIsActive, setActiveIndex }) => {
  let queryParams = useUrlQueryParams();
  let type = queryParams.get("type");
  let role = queryParams.get("role");
  let uid = queryParams.get("uid");
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.down("lg"));
  const { requestDelete, isModalOpen } = useModal();

  // console.log("Values:", values);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: values.reduce((acc, value) => {
      Object.entries(value).forEach(([key, val]) => {
        acc[key] = val;
      });
      return acc;
    }, {}),
  });

  const handleDeleteCmsItem = (event) => {
    requestDelete(event.currentTarget.id, type);
  };

  const handleEditCmsItem = async (data) => {
    const test = await updateCMSItem(uid, role, id, data, type);
    console.log(test);
  };

  const handleCancelEditCmsItem = () => {
    setIsActive(false);
    setActiveIndex(null);
  };

  const renderContent = () => {
    switch (type.toLowerCase()) {
      case "schedule":
        return values.map((value, idx) => <ScheduleItem gameData={value} />);
      case "roster":
        return <TeamRoosterItem currentRoster={values} />;
      default:
        return <Typography>No content available</Typography>;
    }
  };

  return (
    <StyledCmsItemContainer key={indexz} selected={activeIndex === indexz} isActive={isActive}>
      {isModalOpen && <CmsModal />}
      <form onSubmit={handleSubmit(handleEditCmsItem)}>
        {/* <Stack direction={isDesktop ? "column" : "row"} alignItems={"center"} spacing={2}>
          <Typography component={"h1"} variant="h6" sx={{ margin: 0, textAlign: "center" }}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Item #{indexz + 1} | ID : {id}
          </Typography>
          </Stack> */}
        <List>
          <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <input type="checkbox"></input>
            {renderContent()}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {isActive ? (
                <>
                  <Button sx={{ border: "1px solid red", padding: 0 }} type="submit">
                    <SaveAsIcon />
                  </Button>
                  <Button sx={{ border: "1px solid red", padding: 0 }}>
                    <CloseIcon onClick={handleCancelEditCmsItem} />
                  </Button>
                </>
              ) : (
                <Button sx={{ border: "1px solid red", padding: 0 }} onClick={() => onItemClick(indexz)}>
                  <EditIcon />
                </Button>
              )}
              {!isActive && (
                <Button sx={{ border: "1px solid red", padding: 0 }} id={id} onClick={handleDeleteCmsItem}>
                  <DeleteIcon />
                </Button>
              )}
            </Box>
          </ListItem>
        </List>
      </form>
    </StyledCmsItemContainer>
  );
};

export default CmsListItem;

// import React from "react";
// import { Typography, Stack, Box, TextField } from "@mui/material";
// import { StyledCmsItem, StyledCmsItemContainer, StyledList } from "./index.styles";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveAsIcon from "@mui/icons-material/SaveAs";
// import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
// import { useModal } from "../../../setup/context/useCmsModal";
// import CmsModal from "../cmsModal";
// import { updateCMSItem } from "../../../setup/utils/firebase/editItem";
// import { Controller, useForm } from "react-hook-form";
// const CmsListItem = ({ values, indexz, id, activeIndex, isActive, onItemClick }) => {
//   let queryParams = useUrlQueryParams();
//   let type = queryParams.get("type");
//   let role = queryParams.get("role");
//   let uid = queryParams.get("uid");

//   const { requestDelete, isModalOpen } = useModal();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: values.reduce((acc, value) => {
//       Object.entries(value).forEach(([key, val]) => {
//         acc[key] = val;
//       });
//       return acc;
//     }, {}),
//   });

//   const handleDeleteCmsItem = (event) => {
//     requestDelete(event.currentTarget.id, type);
//   };
//   const handleEditCmsItem = async (data, event) => {
//     console.log("test");
//     const docId = event.target.id;
//     const test = await updateCMSItem(uid, role, docId, data, type);
//     console.log(test);
//   };

//   return (
//     <StyledCmsItemContainer key={indexz} selected={activeIndex === indexz} isActive={isActive}>
//       {isModalOpen && <CmsModal />}
//       <Stack direction={"row"} alignItems={"center"} spacing={2}>
//         <h1 style={{ margin: 0 }}>
//           {type.charAt(0).toUpperCase() + type.slice(1)} Item #{indexz + 1}
//           ID : {id}
//         </h1>
//         <Box sx={{ display: "flex", gap: ".5rem" }}>
//           {isActive ? (
//             <button id={id} type="submit" onClick={handleSubmit(handleEditCmsItem)}>
//               <SaveAsIcon id={id} />
//             </button>
//           ) : (
//             <button id={id} onClick={() => onItemClick(indexz)}>
//               <EditIcon />
//             </button>
//           )}
//           {!isActive && (
//             <button id={id} onClick={handleDeleteCmsItem}>
//               <DeleteIcon />
//             </button>
//           )}
//         </Box>
//       </Stack>
//       {values.map((value, index) => (
//         <React.Fragment key={index}>
//           <StyledList sx={{ marginBottom: "2rem" }}>
//             {Object.entries(value).map(([key, value], itemIndex) => (
//               <StyledCmsItem key={key + itemIndex}>
//                 {isActive ? (
//                   <Box id={id} component={"form"} submit={handleSubmit(handleEditCmsItem)}>
//                     <Controller
//                       name={key}
//                       control={control}
//                       rules={{ required: "This field is required *" }}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           label={key}
//                           variant="outlined"
//                           fullWidth
//                           error={!!errors.key}
//                           helperText={errors.key ? errors.key.message : ""}
//                         />
//                       )}
//                     />
//                   </Box>
//                 ) : (
//                   <Typography component="p" style={{ fontWeight: "bold" }}>
//                     {key}: <Typography component="span">{typeof value === "boolean" ? value.toString() : value}</Typography>
//                   </Typography>
//                 )}
//               </StyledCmsItem>
//             ))}
//           </StyledList>
//         </React.Fragment>
//       ))}
//     </StyledCmsItemContainer>
//   );
// };

// export default CmsListItem;
// import React from "react";
// import { Typography, Stack, Box, TextField, Button, useMediaQuery } from "@mui/material";
// import { StyledCmsItem, StyledCmsItemContainer, StyledList } from "./index.styles";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveAsIcon from "@mui/icons-material/SaveAs";
// import CloseIcon from "@mui/icons-material/Close";
// import { useUrlQueryParams } from "../../../setup/utils/helpers/useUrlQueryParams";
// import { useModal } from "../../../setup/context/useCmsModal";
// import CmsModal from "../cmsModal";
// import { updateCMSItem } from "../../../setup/utils/firebase/editItem";
// import { Controller, useForm } from "react-hook-form";
// import { useTheme } from "@mui/material/styles";

// const CmsListItem = ({ values, indexz, id, activeIndex, isActive, onItemClick, setIsActive, setActiveIndex }) => {
//   console.log(values);
//   let queryParams = useUrlQueryParams();
//   let type = queryParams.get("type");
//   let role = queryParams.get("role");
//   let uid = queryParams.get("uid");
//   const theme = useTheme();
//   const isDesktop = useMediaQuery(theme.breakpoints.down("lg"));
//   const { requestDelete, isModalOpen } = useModal();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: values.reduce((acc, value) => {
//       Object.entries(value).forEach(([key, val]) => {
//         acc[key] = val;
//       });
//       return acc;
//     }, {}),
//   });

//   const handleDeleteCmsItem = (event) => {
//     requestDelete(event.currentTarget.id, type);
//   };

//   const handleEditCmsItem = async (data) => {
//     console.log("Editing with data:", data);
//     const test = await updateCMSItem(uid, role, id, data, type);
//     console.log(test);
//   };

//   const handleCancelEditCmsItem = () => {
//     setIsActive(false);
//     setActiveIndex(null);
//   };
//   return (
//     <StyledCmsItemContainer key={indexz} selected={activeIndex === indexz} isActive={isActive}>
//       {isModalOpen && <CmsModal />}
//       <form onSubmit={handleSubmit(handleEditCmsItem)}>
//         <Stack direction={isDesktop ? "column" : "row"} alignItems={"center"} spacing={2}>
//           <Typography component={"h1"} variant="h6" sx={{ margin: 0, textAlign: "center" }}>
//             {type.charAt(0).toUpperCase() + type.slice(1)} Item #{indexz + 1} | ID : {id}
//           </Typography>
//           <Box sx={{ display: "flex", gap: ".5rem" }}>
//             {isActive ? (
//               <>
//                 <Button type="submit">
//                   <SaveAsIcon />
//                 </Button>
//                 <Button sx={{ backgroundColor: "red" }}>
//                   <CloseIcon onClick={handleCancelEditCmsItem} />
//                 </Button>
//               </>
//             ) : (
//               <Button onClick={() => onItemClick(indexz)}>
//                 <EditIcon />
//               </Button>
//             )}
//             {!isActive && (
//               <Button id={id} onClick={handleDeleteCmsItem}>
//                 <DeleteIcon />
//               </Button>
//             )}
//           </Box>
//         </Stack>
//         {values.map((value, index) => (
//           <React.Fragment key={index}>

//           </React.Fragment>
//         ))}
//       </form>
//     </StyledCmsItemContainer>
//   );
// };

// export default CmsListItem;
{
  /* <StyledList sx={{ marginBottom: "2rem" }}>
              {Object.entries(value).map(([key, fieldValue], itemIndex) => (
                <StyledCmsItem key={key + itemIndex}>
                  {isActive ? (
                    <Controller
                      name={key}
                      control={control}
                      rules={{ required: "This field is required *" }}
                      render={({ field }) => (
                        <TextField {...field} label={key} variant="outlined" fullWidth error={!!errors[key]} helperText={errors[key]?.message} />
                      )}
                    />
                  ) : (
                    <Typography component="p" style={{ fontWeight: "bold" }}>
                      {key}: <Typography component="span">{typeof fieldValue === "boolean" ? fieldValue.toString() : fieldValue}</Typography>
                    </Typography>
                  )}
                </StyledCmsItem>
              ))}
            </StyledList> */
}
