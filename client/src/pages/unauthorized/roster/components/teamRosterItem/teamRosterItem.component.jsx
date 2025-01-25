import { TableRow, Typography, Stack, Box, useMediaQuery } from "@mui/material";
import "./teamRosterItem.styles.css";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import PlaceHolderImage from "../../../../../assets/rosterPlaceHolder.png";
import CmsOperationStatus from "../../../../../components/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";
import { StyledTableCell } from "../../../../../styles/index.styles";
import InputFieldComponent from "../../../../../components/inputFields/inputFields";
import CmsUploadItem from "../../../../../components/contentManagementSystem/cmsUploadItem/cmsUploadItem";
import useMediaQueries from "../../../../../setup/utils/helpers/useMediaQueries.utils";

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

export default function TeamRoosterItem({
  data,
  isEditable,
  editableData,
  handleChange,
  isLoading,
  isError,
  isSuccess,
  renderAsRow = true,
  isCmsItem,
}) {
  const theme = useTheme();
  const { isSm, isMd } = useMediaQueries();
  const currentData = isEditable ? editableData : data;
  const { position, height, weight, handed, number, name, year, yearAbbr, playerImage } = currentData || {};

  const isMobile_XS = useMediaQuery(theme.breakpoints.only("xs"));
  if (isLoading || isError || isSuccess) {
    return <CmsOperationStatus isLoading={isLoading} isError={isError} isSuccess={isSuccess} />;
  }

  const content = (
    <>
      {!isEditable && editableData ? <StyledTableCell>{null}</StyledTableCell> : null}
      <StyledTableCell
        isCmsItem={isCmsItem}
        className={isEditable ? "table-header-cell-narrow" : "table-header-cell-normal"}
        sx={{ width: !isEditable && "50%" }}
      >
        {isEditable ? (
          <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
            <Box component="img" src={playerImage || PlaceHolderImage} sx={{ width: { xs: "50px", sm: "70px" }, height: "80px" }}></Box>
            <div>
              <CmsUploadItem
                label="Player Image"
                placeholderTextfield="Enter your url from a cdn..."
                onChange={handleChange("playerImage")}
                value={playerImage}
                cmsItemType="playerImage"
              />
            </div>
          </Stack>
        ) : (
          <Box
            component="img"
            src={playerImage || PlaceHolderImage}
            sx={{ width: { xs: "55px", md: "70px" }, height: { xs: "55px", md: "70px" } }}
          ></Box>
        )}
      </StyledTableCell>

      <StyledTableCell isCmsItem={isCmsItem} className="table-header-cell-narrow">
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
          <Stack direction="row" sx={{ maxWidth: "250px" }} gap={isMd ? 2 : 1}>
            <Typography component="span" variant="span">
              {position}{" "}
            </Typography>
            <span>|</span>
            <Typography component="span" variant="span">
              {height}{" "}
            </Typography>
            <span>|</span>
            <Typography component="span" variant="span">
              {weight}{" "}
            </Typography>
            <span>|</span>
            <Typography component="span" variant="span">
              {handed}
            </Typography>
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
            <Stack direction="row" gap={isMd ? 2 : 1} alignItems="center">
              <StyledNumberTypography>{number}</StyledNumberTypography>
              <Typography typography={{ xs: "bodyTextLg" }} sx={{ minWidth: { xs: "60%", lg: "350px" }, fontWeight: 700, fontSize: { md: "24px" } }}>
                {name}
              </Typography>
            </Stack>
          )}
        </Box>
      </StyledTableCell>

      {isMd && (
        <StyledTableCell isCmsItem={isCmsItem}>
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
      )}
    </>
  );

  return renderAsRow ? <StyledTableRow>{content}</StyledTableRow> : content;
}
