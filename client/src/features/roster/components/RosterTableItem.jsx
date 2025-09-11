import React from "react";
import { StyledTableCell } from "../../ui/components/DataTable";
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import PlaceHolderImage from "../../../assets/rosterPlaceHolder.png";

// Fixed section - Player name + image (key identifying data)
const RosterTableItemFixed = ({ data, isCmsItem }) => {
  const { playerImage, name } = data || {};

  return (
    <>
      <StyledTableCell style={{ minWidth: "175px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={playerImage || PlaceHolderImage}
            alt={`${name}'s profile`}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#1a2b4f" }}>{name}</span>
        </div>
      </StyledTableCell>
    </>
  );
};

// Scrollable section - All player stats + actions
const RosterTableItemScrollable = ({ data, isCmsItem }) => {
  const { isMd } = useMediaQueries();
  const { position, height, weight, handed, number, year, yearAbbr } = data || {};

  return (
    <>
      <StyledTableCell style={{ minWidth: "80px" }}>
        <span style={{ fontSize: "14px", color: "#1a2b4f" }}>{position}</span>
      </StyledTableCell>
      <StyledTableCell style={{ minWidth: "100px" }}>
        <span style={{ fontSize: "14px", color: "#1a2b4f" }}>{handed}</span>
      </StyledTableCell>
      <StyledTableCell style={{ minWidth: "80px" }}>
        <span style={{ fontSize: "14px", color: "#1a2b4f" }}>{number}</span>
      </StyledTableCell>
      <StyledTableCell style={{ minWidth: "80px" }}>
        <span style={{ fontSize: "14px", color: "#1a2b4f" }}>{isMd ? year : yearAbbr}</span>
      </StyledTableCell>
      <StyledTableCell style={{ minWidth: "80px" }}>
        <span style={{ fontSize: "14px", color: "#1a2b4f" }}>{height}</span>
      </StyledTableCell>
      <StyledTableCell style={{ minWidth: "90px" }}>
        <span style={{ fontSize: "14px", color: "#1a2b4f" }}>{weight}</span>
      </StyledTableCell>
    </>
  );
};

// Main component that handles section rendering
const RosterTableItem = ({ data, isCmsItem, section }) => {
  if (section === "fixed") {
    return <RosterTableItemFixed data={data} isCmsItem={isCmsItem} />;
  } else if (section === "scrollable") {
    return <RosterTableItemScrollable data={data} isCmsItem={isCmsItem} />;
  }

  // Fallback to original behavior if no section specified
  return (
    <>
      <RosterTableItemFixed data={data} isCmsItem={isCmsItem} />
      <RosterTableItemScrollable data={data} isCmsItem={isCmsItem} />
    </>
  );
};

export default RosterTableItem;
