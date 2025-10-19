import React from "react";
import PropTypes from "prop-types";
import { TableBody, TableHead } from "@mui/material";
// Components
import {
  StyledTableContainer,
  StyledFixedTable,
  StyledScrollableTable,
  StyledScrollContainer,
  StyledTableHeader,
} from "../../ui/components/DataTable";
import { StyledPlayerAvatar, StyledPlayerLink, StyledPlayerImage } from "./TeamRoster.styles";
// Styled Components
import {
  StyledTableWrapper,
  StyledTableHeadFixed,
  StyledTableBodyFixed,
  StyledNameHeaderCell,
  StyledDataHeaderCell,
  StyledTableRowWithBackground,
  StyledAvatarCell,
  StyledNameCell,
  StyledDataCell,
  StyledDataCellWithMinWidth,
} from "./TeamRosterTableView.styles";
// Utils
import useMediaQueries from "../../../utils/helpers/useMediaQueries.utils";
import headerMap from "../data/rosterHeaderMap.config.jsx";
import CustomPagination from "../../ui/components/Pagination.jsx";
import { useTheme } from "@emotion/react";

const TeamRosterTableView = ({ players = [], totalItems, itemsPerPage, currentPage, onPageChange, setItemsPerPage }) => {
  const { isMd } = useMediaQueries();
  const theme = useTheme();

  // Function to get the first letter of player's name for avatar
  const getPlayerInitial = (name) => {
    return name.charAt(0);
  };

  const checkHeaderText = (field) => {
    if (!field) return;
    return isMd ? headerMap[field].full : headerMap[field].abbr;
  };

  return (
    <StyledTableWrapper>
      <StyledTableContainer>
        {/* Fixed Name Column */}
        <StyledFixedTable>
          <StyledTableHeadFixed>
            <StyledTableHeader isSplitTable={true} tableSection="fixed">
              <StyledNameHeaderCell colSpan={2} backgroundType={theme.palette.gradients.primaryToLeft}>
                Name
              </StyledNameHeaderCell>
            </StyledTableHeader>
          </StyledTableHeadFixed>
          <StyledTableBodyFixed>
            {players.map((player, index) => (
              <StyledTableRowWithBackground key={player.id}>
                <StyledAvatarCell index={index} length={players.length}>
                  {player.playerImage ? (
                    <StyledPlayerImage src={player.playerImage[0].url} alt={player.name} />
                  ) : (
                    <StyledPlayerAvatar>{getPlayerInitial(player.name)}</StyledPlayerAvatar>
                  )}
                </StyledAvatarCell>
                <StyledNameCell index={index} length={players.length}>
                  <StyledPlayerLink>{player.fullName}</StyledPlayerLink>
                </StyledNameCell>
              </StyledTableRowWithBackground>
            ))}
          </StyledTableBodyFixed>
        </StyledFixedTable>

        {/* Scrollable Data Columns */}
        <StyledScrollContainer>
          <StyledScrollableTable>
            <TableHead sx={{ background: `${theme.palette.gradients.primaryToRight} !important` }}>
              <StyledTableHeader isSplitTable={true} tableSection="scrollable">
                {["Pos", "Bat", "Thw", "Year", "Height", "Weight"].map((field) => (
                  <StyledDataHeaderCell key={field}>{checkHeaderText(field)}</StyledDataHeaderCell>
                ))}
              </StyledTableHeader>
            </TableHead>
            <TableBody>
              {players.map((player, index) => (
                <StyledTableRowWithBackground key={player.id}>
                  <StyledDataCell index={index} length={players.length}>
                    {player.position}
                  </StyledDataCell>
                  <StyledDataCell index={index} length={players.length}>
                    {player.bats || "N/A"}
                  </StyledDataCell>
                  <StyledDataCell index={index} length={players.length}>
                    {player.throws || "N/A"}
                  </StyledDataCell>
                  <StyledDataCell index={index} length={players.length}>
                    {isMd ? player.year : player.yearAbbreviation}
                  </StyledDataCell>
                  <StyledDataCellWithMinWidth minWidth="70px" index={index} length={players.length}>
                    {player.heightFeet}'' {player.heightInches}'
                  </StyledDataCellWithMinWidth>
                  <StyledDataCellWithMinWidth minWidth="80px" index={index} length={players.length}>
                    {player.weight}lbs
                  </StyledDataCellWithMinWidth>
                </StyledTableRowWithBackground>
              ))}
            </TableBody>
          </StyledScrollableTable>
        </StyledScrollContainer>
      </StyledTableContainer>
      <CustomPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        setItemsPerPage={setItemsPerPage}
        itemsPerPageBase={9}
      />
    </StyledTableWrapper>
  );
};

TeamRosterTableView.propTypes = {
  players: PropTypes.array.isRequired,
  playersOriginal: PropTypes.array.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

export default TeamRosterTableView;
