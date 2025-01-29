/* eslint-disable @typescript-eslint/no-explicit-any */
import { IKUpload } from "imagekitio-next";
import { Box, CircularProgress, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

interface UploadProps {
  onSuccess: (res: any) => void;
  onError: (err: any) => void;
  isLoading: boolean;
}

const UploadComponent = ({ onSuccess, onError, isLoading }: UploadProps) => (
  <Box
    textAlign="center"
    width="100%"
    minWidth="1000px"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    bgcolor="white"
    borderRadius={2}
    p={4}
    boxShadow={3}
  >
    <IconButton
      sx={{
        fontSize: 100,
        color: "primary.main",
        mb: 2,
        '&:hover': {
          backgroundColor: 'transparent',
        }
      }}
      aria-label="upload"
    >
      <UploadIcon fontSize="inherit" sx={{color:"black"}} />
    </IconButton>
    <IKUpload
      fileName="test-upload.png"
      onError={onError}
      onSuccess={onSuccess}
    />
    {isLoading && <CircularProgress color="primary" />}
  </Box>
);

export default UploadComponent;
