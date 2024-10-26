import React from "react";
import { Card, CardActions, CardContent, Grid, Link, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import CmsOperationStatus from "../../../../../components/contentManagementSystem/cmsOperationStatus/cmsOperationStatus";
import InputFieldComponent from "../../../../../components/inputFields/inputFields";

import { StyledTableCell, StyledTableRow } from "../../../../../styles/index.styles";
import { formatServerTimestamp } from "../../../../../setup/utils/helpers/formatDate";
import { formatFileSize } from "../../../../../setup/utils/helpers/formatFileSize";

const StyledCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  minHeight: "260px",
  width: "100%",
  border: `1px solid ${theme.palette.borders.primary}`,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#fff",
}));

export default function DocumentCard({ ...props }, index) {
  const { data, isEditable, editableData, handleChange, isLoading, isError, isSuccess, renderAsRow = true, isCmsItem, isCard } = props;
  const theme = useTheme();
  const currentData = isEditable ? editableData : data;
  if (isLoading || isError || isSuccess) {
    return <CmsOperationStatus isLoading={isLoading} isError={isError} isSuccess={isSuccess} />;
  }

  const editableContent = (
    <React.Fragment key={currentData?.id}>
      {isEditable ? (
        <>
          {/* <InputFieldComponent label="Replace With New File" onChange={handleChange("")} type="file" value={currentData?.documentLink} /> */}
          <InputFieldComponent
            // helperText="Please Do Not Include The File Extension (Ex. .pdf, .docx, .jpg, etc.)"
            label="File Name"
            onChange={handleChange("fileName")}
            type="text"
            value={currentData?.fileName}
          />
        </>
      ) : (
        <Typography component="h2" variant="h6" color={theme.palette.primary.main}>
          {currentData?.fileName}
        </Typography>
      )}
      {isCmsItem && (
        <Stack direction="row" gap={2} marginTop={2}>
          <Typography variant="body1" component="p">
            Uploaded: {formatServerTimestamp(currentData?.createdAt)}
          </Typography>

          <Typography variant="body1" component="p">
            File Size: {formatFileSize(currentData?.fileSize)}
          </Typography>
        </Stack>
      )}
    </React.Fragment>
  );

  const cardContent = (
    <Grid id="document-grid-item" item xs={12} sm={6}>
      <StyledCard elevation={8}>
        <CardContent>{editableContent}</CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 5 }}>
          <Link href={currentData?.url} target="_blank" rel="noopener noreferrer" sx={{ height: "100%", width: "100%", textDecoration: "none" }}>
            <Typography
              typography="p"
              component="p"
              sx={{
                color: `${theme.palette.secondary.main} !important`,
                "&:hover": {
                  color: `${theme.palette.secondary.dark} !important`,
                  cursor: "pointer",
                  transition: ".3s all ease-in-out",
                },
              }}
            >
              <u>Read more</u>
            </Typography>
          </Link>
        </CardActions>
      </StyledCard>
    </Grid>
  );

  return isCard ? (
    cardContent
  ) : renderAsRow ? (
    <StyledTableRow>{editableContent}</StyledTableRow>
  ) : (
    <>
      {!isEditable && editableData ? <StyledTableCell>{null}</StyledTableCell> : null}
      <StyledTableCell>{editableContent}</StyledTableCell>
    </>
  );
}
