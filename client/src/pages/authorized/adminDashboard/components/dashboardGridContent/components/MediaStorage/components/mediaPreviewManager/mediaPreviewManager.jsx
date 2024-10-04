import { Button, Stack, Typography } from "@mui/material";
import FormStatusIndicator from "../../../../../../../../../components/statusIndicators/formStatusIndicator";

const MediaPreviewManager = ({ preview, file, progress, statusMessage, handleUploadMedia, handleCancelUpload }) => {
  return (
    <>
      {file && (
        <div
          id="media-preview-manager"
          style={{
            // display: "flex",
            flexDirection: "column",
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            zIndex: "1000",
            width: "100%",
            padding: "1rem",
            boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.479)",
            display: file ? "flex" : "none",
          }}
        >
          <FormStatusIndicator progress={progress.toFixed()} statusMessage={statusMessage} />
          {preview && (
            <>
              <Stack sx={{ width: "100%" }} direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={2}>
                  <img src={preview} style={{ height: "50px", width: "50px" }} alt="Preview" />
                  <Typography> {file.name} </Typography>
                </Stack>
                <Button variant="outlined" onClick={handleCancelUpload}>
                  Cancel X
                </Button>
              </Stack>
            </>
          )}

          <Button disabled={statusMessage === "Loading..."} sx={{ marginTop: "2rem" }} onClick={handleUploadMedia} variant="contained">
            Upload Image
          </Button>
        </div>
      )}
    </>
  );
};

export default MediaPreviewManager;
