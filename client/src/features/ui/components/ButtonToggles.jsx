import React from "react";
import PropTypes from "prop-types";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// Context
import { useViewToggle } from "../../../utils/contexts/ViewToggleContext";
// Styled Components
import {
  StyledButtonTogglesContainer,
  StyledToggleButton,
  StyledToggleIcon,
} from "./ButtonToggles.styles";

const ButtonToggles = ({ tableIcon = FormatListBulletedIcon, gridIcon = GridViewIcon }) => {
  const { view, setView, isTableView, isGridView } = useViewToggle();

  const TableIcon = tableIcon;
  const GridIcon = gridIcon;

  return (
    <StyledButtonTogglesContainer
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <StyledToggleButton
        title="Table View"
        variant={isTableView ? "contained" : "minimal"}
        size="small"
        onClick={() => setView("table")}
        color="secondary"
        isActive={isTableView}
      >
        <StyledToggleIcon>
          <TableIcon />
        </StyledToggleIcon>
      </StyledToggleButton>
      
      <StyledToggleButton
        title="Grid View"
        variant={isGridView ? "contained" : "minimal"}
        size="small"
        onClick={() => setView("grid")}
        color="secondary"
        isActive={isGridView}
      >
        <StyledToggleIcon>
          <GridIcon />
        </StyledToggleIcon>
      </StyledToggleButton>
    </StyledButtonTogglesContainer>
  );
};

ButtonToggles.propTypes = {
  tableIcon: PropTypes.elementType,
  gridIcon: PropTypes.elementType,
};

export default ButtonToggles;
