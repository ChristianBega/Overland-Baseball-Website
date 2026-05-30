//TODO : ! used in the dashboard roster table, but we will be deleting this soon and using the DataTable.jsx component instead
// Todo: This needs to be simplified.... we have 3 different components (eventItems, ScheduleItem, TeamRosterItem) that are all essentially the same thing... just different data. Instead we should have a universal component that can be used for all or just leverage existing dataTable component (like roster component)
import React from "react";
// MUI
import { styled } from "@mui/material";
// Assets
import PlaceHolderImage from "../../../assets/rosterPlaceHolder.png";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
// Utils

// Styled components using proper table elements

const TableCell = styled("td")({
  padding: "16px",
  borderBottom: "1px solid rgba(224, 224, 224, 0.4)",
  verticalAlign: "middle",
});

const NameCell = styled(TableCell)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  position: "sticky",
  minWidth: "100px",
}));

const PlayerImage = styled("img")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover",
});

const PlayerName = styled("span")({
  fontSize: "14px",
  fontWeight: 500,
  color: "#1a2b4f",
});

const InfoText = styled("span")({
  fontSize: "14px",
  color: "#1a2b4f",
});

const TeamRosterContent = ({ data, isCmsItem }) => {
  const { isMd } = useMediaQueries();
  const { playerImage, position, height, weight, handed, number, name, year, yearAbbr } = data;

  return (
    <>
      <NameCell>
        <PlayerImage src={playerImage || PlaceHolderImage} alt={`${name}'s profile`} />
        <PlayerName>{name}</PlayerName>
      </NameCell>
      <TableCell>
        <InfoText>{position}</InfoText>
      </TableCell>
      <TableCell>
        <InfoText>{handed}</InfoText>
      </TableCell>
      <TableCell>
        <InfoText>{handed}</InfoText>
      </TableCell>
      <TableCell>
        <InfoText>{isMd ? year : yearAbbr}</InfoText>
      </TableCell>
      <TableCell>
        <InfoText>{height}</InfoText>
      </TableCell>
      <TableCell>
        <InfoText>{weight}</InfoText>
      </TableCell>

      {/* <TableCell>
        <InfoText>{weight}</InfoText>
      </TableCell> */}
    </>
  );
};

export default TeamRosterContent;
