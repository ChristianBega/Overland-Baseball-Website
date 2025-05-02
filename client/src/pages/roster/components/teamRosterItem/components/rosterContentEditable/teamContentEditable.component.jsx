import React from "react";
// MUI
import { Box, Stack, Typography } from "@mui/material";
import { StyledTableCell } from "../../../../../../styles/index.styles";
// Components
import InputFieldComponent from "../../../../../../components/inputFields/inputFields";
import { CmsUploadItem } from "../../../../../../features/cms";

// Assets
import PlaceHolderImage from "../../../../../../assets/rosterPlaceHolder.png";
// Utils
import useMediaQueries from "../../../../../../setup/utils/helpers/useMediaQueries.utils";

const TeamContentEditable = ({ ...props }) => {
  const { isCmsItem, handleChange, isEditable, data } = props;
  const { playerImage, position, height, weight, handed, number, name, year, yearAbbr } = data || {};
  const { isMd, isSm, isMobile_XS } = useMediaQueries();

  return (
    <>
      <StyledTableCell
        isCmsItem={isCmsItem}
        className={isEditable ? "table-header-cell-narrow" : "table-header-cell-normal"}
        sx={{ width: !isEditable && "50%" }}
      >
        {isEditable ? (
          <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
            <Box component="img" src={playerImage || PlaceHolderImage} sx={{ width: { xs: "50px", sm: "70px" }, height: "80px" }} />
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
          <Box component="img" src={playerImage || PlaceHolderImage} sx={{ width: { xs: "55px", md: "70px" }, height: { xs: "55px", md: "70px" } }} />
        )}
      </StyledTableCell>

      <StyledTableCell isCmsItem={isCmsItem}>
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
              {position}
            </Typography>
            <span>|</span>
            <Typography component="span" variant="span">
              {height}
            </Typography>
            <span>|</span>
            <Typography component="span" variant="span">
              {weight}
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
                <InputFieldComponent label="Name" onChange={handleChange("name")} type="text" value={name} />
              </div>
            </Stack>
          ) : (
            <Stack direction="row" gap={isMd ? 2 : 1} alignItems="center">
              <Typography>{number}</Typography>
              <Typography
                typography={{ xs: "bodyTextLg" }}
                sx={{
                  minWidth: { xs: "60%", lg: "350px" },
                  fontWeight: 700,
                  fontSize: { md: "24px" },
                }}
              >
                {name}
              </Typography>
            </Stack>
          )}
        </Box>
      </StyledTableCell>

      {isSm && (
        <StyledTableCell isCmsItem={isCmsItem}>
          {isEditable ? (
            <Stack>
              <InputFieldComponent label="Year" onChange={handleChange("year")} type="text" value={year} />
              <InputFieldComponent label="Year Abbr" onChange={handleChange("yearAbbr")} type="text" value={yearAbbr} />
            </Stack>
          ) : (
            <Typography typography={{ xs: "bodyTextLg" }} sx={{ display: "inline-block" }}>
              {!isMobile_XS ? year : yearAbbr}
            </Typography>
          )}
        </StyledTableCell>
      )}
    </>
  );
};

export default TeamContentEditable;
