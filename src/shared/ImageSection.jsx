import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, keyframes } from "@mui/material";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ImageSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: "/src/assets/images/image/Finance app-cuate.svg",
      title: "Welcome to Our Platform",
      description:
        "Join thousands of happy suppliers growing their business with us",
    },
    {
      image: "/src/assets/images/image/Online wishes list-pana.svg",
      title: "Feature Highlights",
      description: "Discover powerful tools to grow your business",
    },
    {
      image: "/src/assets/images/image/Online ads-amico.svg",
      title: "Get Started Today",
      description: "Sign up now to unlock your supplier dashboard",
    },
  ];

  // Auto-rotate slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #FFA790, #FB8C00)",
      }}
    >
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Animated Image */}
        <Box
          sx={{
            width: 250,
            height: 250,
            position: "relative",
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                animation:
                  activeSlide === index ? `${fadeIn} 0.5s ease-out` : "none",
                opacity: activeSlide === index ? 1 : 0,
                transition: "opacity 0.5s ease",
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <img src={slide.image} alt="Platform Visual" />
            </Box>
          ))}
        </Box>

        {/* Text Container with Fixed Height */}
        <Box
          sx={{
            height: 120,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                animation:
                  activeSlide === index ? `${slideUp} 0.5s ease-out` : "none",
                opacity: activeSlide === index ? 1 : 0,
                transition: "opacity 0.5s ease",
                textAlign: "center",
                px: 2,
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "common.white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  fontWeight: 600,
                }}
              >
                {slide.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "common.white",
                  maxWidth: "80%",
                }}
              >
                {slide.description}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Navigation Dots */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setActiveSlide(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  activeSlide === index ? "white" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.3)",
                  backgroundColor: "white",
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Grid>
  );
};

export default ImageSection;
