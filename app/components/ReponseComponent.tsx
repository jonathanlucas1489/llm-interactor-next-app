import { Box, Typography } from "@mui/material";

interface ResponseProps {
  responseText: string;
  isUser: boolean;
}

const ResponseComponent = ({ responseText, isUser }: ResponseProps) => (
  <Box
    textAlign="left"
    p={2}
    bgcolor={isUser ? "grey.500" : "white"}
    borderRadius={2}
    boxShadow={1}
    width="100%"
    maxWidth="1500px"
  >
    <Typography variant="body1">
      {!isUser ? "Chat: " : "You: "}{responseText}
    </Typography>
  </Box>
);

export default ResponseComponent;
