import { ReactNode } from "react";
import { Stack } from "@mui/material";

interface WrapperProps {
    children: ReactNode;
    maxWidth?: string;
    backgroundColor?: string;
}

export default function SectionWrapper({ children, maxWidth = "1200px", backgroundColor = "black" }: WrapperProps) {
    return (
        <Stack
            justifyContent="center" alignItems="center"

            sx={{
                margin: "0 auto",
                padding: "25px",
                maxWidth,
                backgroundColor,
            }}
        >
            {children}
        </Stack>
    );
}