import React, { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";

const Navbar = () => {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const closeLogoRef = useRef(null);
  const orkenTextLogoRef = useRef(null);
  const linkRefs = useRef([]);
  const boxRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleSection = (value) => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const closeLogo = closeLogoRef.current;
    const orkenTextLogo = orkenTextLogoRef.current;
    const link = linkRefs.current;

    const shouldScale = scrolling || value; // Scale when scrolling OR menu is open

    if (value) {
      // Nav section slide in
      gsap.to(section, {
        opacity: 0.9,
        duration: 0.5,
        ease: "power2.out",
      });

      // Logo rotate anti-clockwise from top
      gsap.to(logo, {
        rotation: 120,
        y: -180,
        duration: 0.4,
        scale: scrolling ? 0.5 : 1,
        ease: "power2.out",
      });
      // close logo icon
      gsap.to(closeLogo, {
        rotation: -90,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      //orkenTextLogo
      gsap.from(orkenTextLogo, {
        y: -100,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
      });

      //nav link
      gsap.fromTo(
        link,
        {
          yPercent: 100,
          opacity: 0,
          overwrite: true,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          // delay: 0.1,
          ease: "power4.inOut",
          overwrite: true,
        }
      );
    } else {
      // Nav section slide out
      gsap.to(section, {
        opacity: 0.9,
        duration: 0.5,
        ease: "power2.in",
      });
      // Logo rotate clockwise to top
      gsap.to(logo, {
        rotation: 0,
        y: scrolling ? -45 : 0,
        scale: scrolling ? 0.5 : 1,
        duration: 0.4,
        ease: "power2.in",
      });
      // close logo icon
      gsap.to(closeLogo, {
        rotation: 360,
        scale: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
    setIsVisible(value);
  };

  useEffect(() => {
    linkRefs.current.forEach((linkRef, index) => {
      const boxElement = boxRefs.current[index];

      gsap.set(linkRef, { y: 0 });

      boxElement.addEventListener("mouseenter", () => {
        gsap.to(linkRef, {
          y: "-7svh",
          z: "-10svh",
          duration: 0.15,
          ease: "power1.inOut",
        });
      });

      boxElement.addEventListener("mouseleave", () => {
        gsap.to(linkRef, {
          y: 0,
          duration: 0.15,
          ease: "power1.inOut",
        });
      });
    });

    // Scale the icon when scroll reaches 100px
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldScale = scrollY >= 90;

      setScrolling(shouldScale);
      gsap.to(logoRef.current, {
        scale: shouldScale ? 0.5 : isVisible ? 0.5 : 1,
        duration: 0.3,
        y: shouldScale ? -45 : 0,
        rotate: shouldScale ? 360 : 0,
        ease: "power2",
      });
    };
    if (!isVisible) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navLinks]);

  // triangle grid
  const canvasRef = useRef(null);
  useEffect(() => {
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
      ctx.lineWidth = 1;

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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Logo Trigger */}
      <Box
        ref={logoRef}
        sx={{
          position: "fixed",
          width: { xs: "20svw", sm: "14svw", md: "8svw", lg: "6vw" },
          overflow: "visible",
          top: 40,
          zIndex: 1110,
          cursor: "pointer",
          userSelect: "none",
          transition: "transform .2s cubic-bezier(.08,.57,.1,1.38)",
          ":hover": {
            img: {
              transform: "scale(1.15)",
            },
          },
        }}
        onClick={() => toggleSection(true)}
      >
        <img
          src="/images/orken-logo.svg"
          alt="Orken"
          style={{
            height: "100%",
            width: "100%",
            transition: "ease 0.1s",
          }}
        />
      </Box>

      {/* Nav Link Section */}
      <Box
        ref={sectionRef}
        sx={{
          p: 2.5,
          backgroundColor: "#000",
          display: isVisible ? "flex" : "none", // Conditionally render
          flexDirection: "column",
          justifyContent: "space-between",
          height: { xs: "97svh", md: "97.3vh" },
          position: "fixed",
          overflow: "hidden",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
        }}
      >
        {/* Triangle grid section */}
        <Box
          sx={{
            position: "absolute",
            overflow: "hidden",
            top: -167,
            left: -186,
            right: 0,
            bottom: 0,
          }}
        >
          <canvas ref={canvasRef} />
        </Box>
        {/* Top Section */}
        <Box ref={orkenTextLogoRef}>
          <img
            src="/images/orken-text-logo.svg"
            alt=""
            style={{
              height: "auto",
              width: 100,
            }}
          />
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            textAlign: { xs: "center", md: "inherit" },
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
            }}
          >
            {navLinks?.map((item, index) => (
              <Box
                key={index}
                ref={(el) => (boxRefs.current[index] = el)}
                sx={{
                  overflow: "hidden",
                  height: "6.8svh",
                }}
              >
                <Box
                  className="first"
                  ref={(el) => (linkRefs.current[index] = el)}
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "10svh",
                    lineHeight: ".68em",
                    fontWeight: 600,
                    fontFamily: "Geo",
                    letterSpacing: "-.06em",
                    color: "#fff",
                    cursor: "pointer",
                    width: "fit-content",
                    transition: "transform 100ms ease",
                    mx: { xs: "auto", md: 0 },
                  }}
                >
                  {item?.name}
                  <Typography
                    className={"new"}
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "10svh",
                      letterSpacing: "-.10em",
                      fontWeight: 400,
                      fontFamily: "Geo",
                      color: "#ff6b00",
                      width: "fit-content",
                      cursor: "pointer",
                      transition: "transform 0.1s ease",
                      mt: "-4svh",
                      mx: { xs: "auto", md: 0 },
                    }}
                  >
                    {item?.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Close Button */}
          <Box
            ref={closeLogoRef}
            sx={{
              width: { xs: "10svw", sm: "6svw", md: "10svw" },
              cursor: "pointer",
              order: { xs: -1, md: 2 },
              mb: { xs: 6, md: 0 },
            }}
            onClick={() => toggleSection(false)}
          >
            <svg
              className="nav-close-icon"
              viewBox="0 0 86 86"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="14.7158"
                y="0.573242"
                width="100"
                height="20"
                transform="rotate(45 14.7158 0.573242)"
                fill="white"
              ></rect>
              <rect
                x="85.4263"
                y="14.7158"
                width="100"
                height="20"
                transform="rotate(135 85.4263 14.7158)"
                fill="white"
              ></rect>
            </svg>
          </Box>
        </Box>

        {/* Placeholder for Social Media */}
        <Box></Box>
      </Box>
    </Box>
  );
};

export default Navbar;

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Teasers", link: "/" },
  { name: "About", link: "/" },
  { name: "Kickstarter", link: "/" },
  { name: "Story", link: "/" },
  { name: "Newsletter", link: "/" },
  { name: "Discord", link: "/" },
];
