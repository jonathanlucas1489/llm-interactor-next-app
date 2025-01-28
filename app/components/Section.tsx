import { Box, Typography, Zoom } from "@mui/material";
import Image from "next/image";
import SectionWrapper from "./SectionWapper";
import { useInView } from "react-intersection-observer";

interface SectionProps {
  title: string;
  text: string;
  imgSrc: string;
  reverse?: boolean;
}

export default function Section({ title, text, imgSrc, reverse = false }: SectionProps) {

  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.6, 
  });


  return (
    <SectionWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: reverse ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1, paddingRight: reverse ? "0" : "20px", paddingLeft: reverse ? "20px" : "0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} color="white">
            {title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "10px" }} color="white">
            {text}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} ref={ref}>
          <Zoom in={inView} timeout={500}>
            <Image src={imgSrc} alt={title} width={500} height={300} />
          </Zoom>
        </Box>
      </Box>
    </SectionWrapper>
  );
}