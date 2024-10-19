import { TableRow, Typography, Stack, Box, useMediaQuery } from "@mui/material";
import "./teamRosterItem.styles.css";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import PlaceHolderImage from "../../../../../assets/rosterPlaceHolder.png";
import CmsOperationStatus from "../../../../../components/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";
import { StyledTableCell } from "../../../../../styles/index.styles";
import InputFieldComponent from "../../../../../components/inputFields/inputFields";
import CmsUploadItem from "../../../../../components/contentManagementSystem/cmsUploadItem/cmsUploadItem";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-type-of(even)": {
    backgroundColor: "#f2f2f2",
  },
  boxShadow: 10,
  maxHeight: "120px",
  display: "flex",
}));

const StyledNumberTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "700",
  color: "#fff",
  background: "#091F40",
  width: "2rem",
  height: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
}));

const StyledTableCellContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export default function TeamRoosterItem({ data, isEditable, editableData, handleChange, isLoading, isError, isSuccess, renderAsRow = true }) {
  const theme = useTheme();
  const currentData = isEditable ? editableData : data;
  const { position, height, weight, handed, number, name, year, yearAbbr, playerImage } = currentData;

  const isMobile_XS = useMediaQuery(theme.breakpoints.only("xs"));
  if (isLoading || isError || isSuccess) {
    return <CmsOperationStatus isLoading={isLoading} isError={isError} isSuccess={isSuccess} />;
  }

  const content = (
    <>
      {!isEditable && editableData ? <StyledTableCell>{null}</StyledTableCell> : null}
      <StyledTableCell className={"table-header-cell-narrow"} sx={{ width: !isEditable && "50%" }}>
        {isEditable ? (
          <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
            <Box component="img" src={PlaceHolderImage} sx={{ width: { xs: "70px", sm: "90px" }, height: "90px" }}></Box>
            <div>
              <CmsUploadItem
                label="Player Image"
                placeholderTextfield="Enter your url from a cdn..."
                onChange={handleChange("playerImage")}
                value={playerImage}
              />
            </div>
          </Stack>
        ) : (
          <Box component="img" src={PlaceHolderImage} sx={{ width: { xs: "70px", sm: "90px" }, height: "90px" }}></Box>
        )}
      </StyledTableCell>

      <StyledTableCell className={"table-header-cell-extra-wide"} sx={{ width: !isEditable ? "35%" : "50%" }}>
        {isEditable ? (
          <Stack direction="row">
            <div>
              <InputFieldComponent label="Position" onChange={handleChange("position")} type="text" value={position} />
            </div>
            <div>
              <InputFieldComponent label="Height" onChange={handleChange("height")} type="text" value={height} />
            </div>
            <div>
              <InputFieldComponent label="Weight" onChange={handleChange("weight")} type="text" value={weight} />
            </div>
            <div>
              <InputFieldComponent label="Handed" onChange={handleChange("handed")} type="text" value={handed} />
            </div>
          </Stack>
        ) : (
          <Stack direction="row" sx={{ maxWidth: "250px" }} gap={2}>
            <StyledTypography>{position} </StyledTypography>
            <span>|</span>
            <StyledTypography>{height} </StyledTypography>
            <span>|</span>
            <StyledTypography>{weight} </StyledTypography>
            <span>|</span>
            <StyledTypography>{handed}</StyledTypography>
          </Stack>
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isEditable ? (
            <Stack direction="row" gap={2} alignItems="center">
              <div>
                <InputFieldComponent label="Number" onChange={handleChange("number")} type="numeric" value={Number(number)} />
              </div>
              <div>
                <InputFieldComponent label="Name" onChange={handleChange("name")} type="text" value={name} style={{ width: "200px" }} />
              </div>
            </Stack>
          ) : (
            <Stack direction="row" gap={2} alignItems="center">
              <StyledNumberTypography>{number}</StyledNumberTypography>
              <Typography typography={{ xs: "bodyTextLg" }} sx={{ minWidth: { xs: "60%", lg: "350px" }, fontWeight: 700, fontSize: { md: "24px" } }}>
                {name}
              </Typography>
            </Stack>
          )}
        </Box>
      </StyledTableCell>

      <StyledTableCell>
        {isEditable ? (
          <Stack>
            <InputFieldComponent label="Year" onChange={handleChange("year")} type="text" value={year} />
            <InputFieldComponent label="Year Abbr" onChange={handleChange("yearAbbr")} type="text" value={yearAbbr} />
          </Stack>
        ) : (
          <>
            <Typography typography={{ xs: "bodyTextLg" }} sx={{ display: "inline-block" }}>
              {!isMobile_XS ? year : yearAbbr}
            </Typography>
          </>
        )}
      </StyledTableCell>
    </>
  );

  return renderAsRow ? <StyledTableRow>{content}</StyledTableRow> : content;
}
