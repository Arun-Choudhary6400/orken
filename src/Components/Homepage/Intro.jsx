import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const theme = useTheme();
  const intro = useRef(null);
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

  /// Animation

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".trailers",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });
    const trailerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".trailers",
        start: "top 70%",
        end: "top 60%",
        scrub: 1,
      },
    });
    tl.to(
      ".text-animation-first-section",
      {
        yPercent: -5,
        duration: 1,
        ease: "power1",
      },
      "ani1"
    );
    tl.to(
      ".background-image-section",
      {
        xPercent: -18,
        duration: 1,
        ease: "power1",
      },
      "ani1"
    );
    tl.to(".background-image-section", {
      xPercent: -30,
      yPercent: -30,
      duration: 1,
      delay: -0.5,
      ease: "power1",
    });

    trailerTl.fromTo(
      ".trailers .trailer-scaler",
      {
        scale: 0.8,
        rotate: 4,
        duration: 0.5,
        ease: "power1.inOut",
      },
      {
        scale: 1,
        rotate: 0,
        duration: 1,
        ease: "power1.inOut",
      }
    );
  }, []);

  return (
    <>
      <Box
        ref={intro}
        sx={{
          height: "200vh",
          position: "relative",
          zIndex: 1,
          // overflow: "hidden",
        }}
      >
        {/* Background Image section */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            width: "100vw",
            display: "block",
            overflow: "hidden",
          }}
        >
          <Box
          className="background-image-section"
            sx={{
              display: "block",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                left: 0,
                top: 0,
                ml: "-2vh",
                height: "104vh",
                width: "auto",
                maxWidth: { xs: "none", md: "initial" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  ml: "-6vh",
                  height: "100%",
                  width: "auto",
                  maxWidth: { xs: "none", md: "initial" },
                  overflow: { xs: "unset", md: "hidden" },
                  img: {
                    width: {xs: "auto !important", md: "100%"},
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
        </Box>
        {/* Orken Text logo section */}
        <Box
          className="text-animation-first-section"
          sx={{
            position: "absolute",
            top: 0,
            py: 5,
            height: "100svh",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              height: "auto",
              width: { xs: "60svw", md: "40svw", lg: "33vw" },
              zIndex: "inherit",
              mb: "-5vw",
              userSelect: "none",
              pointerEvents: "none",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
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
            // className="text-animation-first-section"
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
      </Box>
    </>
  );
};

export default Intro;

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
