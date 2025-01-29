import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

interface QuestionFormProps {
  onAsk: (question: string) => void;
  disabled: boolean;
}

const QuestionForm = ({ onAsk, disabled }: QuestionFormProps) => {
  const [question, setQuestion] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question) {
      onAsk(question);
      setQuestion("");
    }
  };

  return (
    <Box textAlign="center" mt={4} width="100%" maxWidth="1500px">
      <form onSubmit={handleSubmit}>
        <TextField
          disabled={disabled}
          label="Ask a question"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={disabled}
          sx={{
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            "&.Mui-disabled": {
              background: "#eaeaea",
              color: "#c0c0c0"
            }
          }}
        >
          Ask
        </Button>
      </form>
    </Box>
  );
};

export default QuestionForm;
