import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

const Intro = () => {
    const theme = useTheme();
    const intro = useRef(null)
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const xs = useMediaQuery(theme.breakpoints.down("lg"));
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        // Scale x and y to 0-1 range
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
  
        setCoordinates({
          x: Number(x.toFixed(3)),
          y: Number(y.toFixed(3)),
        });
      };
  
      intro?.current?.addEventListener("mousemove", handleMouseMove);
      return () => {
        intro?.current?.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);
  return (
    <>
    <Box
        ref={intro}
        sx={{
          height: { xs: "100svh", md: "100vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        {/* Background Image section */}
        <Box>
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              ml: "-8vh",
              height: "104vh",
              width: "auto",
              overflow: "hidden",
              img: {
                objectFit: { xs: "cover", md: "unset" },
                objectPosition: { xs: "left", md: "unset" },
              },
            }}
          >
            <img
              src={
                xs
                  ? "/images/filters_quality(60) (6).webp"
                  : "/images/filters_quality(60).webp"
              }
              alt=""
              style={imageStyle}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
            }}
          >
            {backgroundImagePartsData?.map((item, index) => {
              let newIndex = (index + 1) * 10;
              return (
                <Box
                  key={index}
                  sx={[
                    backgroundImagePartsStyle,
                    {
                      transform: `translate(${
                        coordinates.x * newIndex - newIndex / 2
                      }px, ${coordinates.y * newIndex - newIndex / 2}px)`,
                    },
                  ]}
                >
                  <img src={item} alt={"Part" + index} style={imageStyle} />
                </Box>
              );
            })}
          </Box>
        </Box>
        {/* Orken Text logo section */}
        <Box
          sx={{
            height: "auto",
            width: { xs: "60svw", md: "40svw", lg: "33vw" },
            zIndex: "inherit",
            mb: "-5vw",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <img
            src="/images/orken-text-logo.svg"
            alt="Orken"
            style={imageStyle}
          />
        </Box>
        {/* Kick starter section */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              color: "#fff",
            }}
          >
            Together we fight. Some of us will die.
          </Typography>
          <Button
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: 0,
              transition: "ease-out 0.2s",
              letterSpacing: "-.02em",
              padding: "10px",
              ":hover": {
                backgroundColor: "#000",
                color: "#ff6b00",
                letterSpacing: ".05em",
                padding: "10px 20px",
              },
            }}
          >
            Bookmark now on kickstarter
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Intro

const backgroundImagePartsData = [
  "/images/filters_quality(60) (4).webp",
  "/images/filters_quality(60) (3).webp",
  "/images/filters_quality(60) (2).webp",
  "/images/filters_quality(60) (1).webp",
];

const backgroundImagePartsStyle = {
  position: "absolute",
  left: -76,
  top: 0,
  height: { xs: "104svh", md: "104vh" },
  width: "auto",
  transition: "ease 0.1s",
};

const imageStyle = {
  height: "100%",
  width: "100%",
  pointerEvents: "none",
  userSelect: "none",
};
