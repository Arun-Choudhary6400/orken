import {
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Trailers = () => {
  const theme = useTheme();
  const [activeTeaser, setActiveTeaser] = useState(0);
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // triangle grid
  const canvasRef = useRef(null);
  const triangleGridRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth - 200;
      canvas.height = window.innerHeight + 120;
      drawTriangles();
    };

    const drawTriangles = () => {
      const width = canvas.width;
      const height = canvas.height;

      const triangleSize = 307; // Adjust for different density
      const rowHeight = (Math.sqrt(3) / 2) * triangleSize + 35; // Equilateral triangle height
      const cols = Math.ceil(width / triangleSize) + 1;
      const rows = Math.ceil(height / rowHeight) + 1;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 2;

      // Draw horizontal and diagonal lines
      for (let y = 0; y <= rows; y++) {
        let yOffset = y * rowHeight;
        for (let x = 0; x <= cols; x++) {
          let xOffset = x * triangleSize + (y % 2 === 1 ? triangleSize / 2 : 0);

          // Draw diagonal lines from top to bottom
          if (x >= 0 && y >= 0) {
            ctx.beginPath();
            ctx.moveTo(xOffset - triangleSize / 2, yOffset);
            ctx.lineTo(xOffset, yOffset - rowHeight);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(xOffset - triangleSize / 2, yOffset);
            ctx.lineTo(xOffset, yOffset + rowHeight);
            ctx.stroke();
          }

          // Draw horizontal lines
          if (x >= 0) {
            ctx.beginPath();
            ctx.moveTo(xOffset - triangleSize, yOffset);
            ctx.lineTo(xOffset, yOffset);
            ctx.stroke();
          }
        }
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initial draw

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  /// horizontal scroll
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const backgroundVideoRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    let sections = gsap.utils.toArray(".card");

    let cardWidth = window.innerWidth * 0.25 + window.innerWidth * 0.5;
    let endValue = () =>
      `+=${cardWidth * sections.length + window.innerWidth * 0.5}`;

    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length * 2.46),
      ease: "power1.out",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: xs ? 0.3 : sm ? 0.2 : 1,
        end: endValue,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          let progress = self.progress;
          let index = Math.floor(progress * sections.length);
          if (index < sections.length) {
            setActiveTeaser(index);
          }
        },
      },
    });

    gsap.to(triangleGridRef.current, {
      xPercent: -10,
      ease: "power1.out",
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: 0.2,
        end: endValue,
      },
    });

    gsap.fromTo(
      charsRef.current,
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
      },
      {
        x: -50,
        opacity: 0,
        rotateY: 90,
        stagger: 0.5,
        duration: 2,
        ease: "power2",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=300",
          scrub: 1,
        },
      }
    );
    gsap.fromTo(
      ".NoOfTeasers",
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
      },
      {
        x: -50,
        opacity: 0,
        rotateY: 90,
        stagger: 0.5,
        duration: 2,
        ease: "power2",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=100",
          scrub: 1,
        },
      }
    );
    ScrollTrigger.refresh();
    return () => {
      scrollTween.kill();
    };
  }, []);

  const videoRef = useRef(null);
  // useEffect(() => {
  //   if (videoRef.current) {
  //     if (activeTeaser) {
  //       videoRef.current.play();
  //     } else {
  //       videoRef.current.pause();
  //     }
  //   }
  // }, [activeTeaser]);

  return (
    <>
      <Box
        ref={triggerRef}
        sx={{
          position: "relative",
        }}
      >
        {/* Video section */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            height: "100vh",
            width: "100vw",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <video
            ref={backgroundVideoRef}
            src={trailersData[activeTeaser]?.src}
            autoPlay
            muted
            playsInline
            loop
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
        {/* Triangle grid section */}
        <Box
          ref={triangleGridRef}
          sx={{
            position: "absolute",
            overflow: "hidden",
            top: -10,
            left: 0,
            zIndex: 0,
            height: "100vh",
            width: { xs: "100vw", md: "112vw" },
          }}
        >
          <canvas ref={canvasRef} />
        </Box>
        {/* Card section */}
        <Box
          ref={containerRef}
          sx={{
            overflow: "hidden",
            width: "100vw",
            height: "100vh",
            backgroundColor: "#333",
            zIndex: "inherit",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "300vw",
              height: "100vh",
              pl: "21.7svw",
            }}
          >
            <Box
              sx={{
                color: "#fff",
                position: "absolute",
                left: 30,
              }}
            >
              <Typography
                className="teaserHeading"
                sx={{
                  textTransform: "uppercase",
                  lineHeight: "1em",
                  width: "fit-content",
                }}
              >
                {teaserHeading?.map((char, index) => (
                  <Typography
                    className="char"
                    key={index}
                    sx={{
                      mr: 7,
                      fontSize: "5.20vw",
                      fontFamily: "Geo",
                      userSelect: "none",
                      display: "inline-block",
                    }}
                    component={"span"}
                    ref={(el) => (charsRef.current[index] = el)}
                  >
                    {char}
                  </Typography>
                ))}
              </Typography>
              <Typography
                className="NoOfTeasers"
                sx={{
                  fontSize: 30,
                  lineHeight: "1em",
                  fontFamily: "Geo",
                  letterSpacing: -3,
                  mt: -2,
                  ml: 1.5,
                  width: "fit-content",
                  userSelect: "none",
                }}
              >
                0{trailersData.length}
              </Typography>
            </Box>
            {trailersData?.map((item, index) => (
              <TeaserCard className="card" key={index}>
                <Box
                  className="video-box"
                  sx={{
                    height: "50%",
                    width: "100%",
                    transition: "padding .3s cubic-bezier(.165,.84,.44,1)",
                    boxSizing: "border-box",
                  }}
                >
                  <video
                    ref={videoRef}
                    src={item?.src}
                    autoPlay
                    muted
                    playsInline
                    loop
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </Box>
                <Box
                  className="content-box"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "calc(50% - 32px)",
                    p: 2,
                    color: "#fff",
                    transition: "ease 0.2s",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "5vw",
                      lineHeight: ".8em",
                      fontFamily: "Geo",
                      textTransform: "uppercase",
                      wordSpacing: "100vw",
                      transition: "ease 0.2s",
                    }}
                  >
                    {item?.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CardFooterTypo>{item?.category}</CardFooterTypo>
                    <BorderTypo />
                    <CardFooterTypo>{item?.duration}</CardFooterTypo>
                    <BorderTypo />
                    <CardFooterTypo>{item?.platform}</CardFooterTypo>
                  </Box>
                </Box>
              </TeaserCard>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Trailers;
const teaserHeading = ["T", "E", "A", "S", "E", "R", "S"];
const trailersData = [
  {
    src: "/videos/5_sec_v1_cc.mp4",
    title: "The abider creed",
    category: "teaser",
    duration: "00:57",
    platform: "Youtube",
  },
  {
    src: "/videos/5_sec_v3_cc.mp4",
    title: "Edom lives",
    category: "teaser",
    duration: "00:46",
    platform: "Youtube",
  },
  {
    src: "/videos/5_sec_v2_cc.mp4",
    title: "vikari's prayer",
    category: "teaser",
    duration: "00:35",
    platform: "Youtube",
  },
];

const CardFooterTypo = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  textTransform: "capitalize",
  fontFamily: "calluna, Georgia, sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));
const BorderTypo = styled(Typography)(({ theme }) => ({
  height: 14,
  borderRight: "1px solid #fff",
  marginRight: 16,
  paddingRight: 16,
}));
const TeaserCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
  width: "25svw",
  height: "40svw",
  maxHeight: "70svh",
  minHeight: "50svh",
  marginLeft: "50svw",
  transition: "padding .3s cubic-bezier(.165,.84,.44,1)",
  ":hover": {
    // transform: "scale(1.05) !important",
    backgroundColor: "#ff6b00",
    "& .video-box": {
      padding: 20,
    },
  },
  [theme.breakpoints.down("sm")]: {
    width: "85svw",
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "45svw",
  },
}));
