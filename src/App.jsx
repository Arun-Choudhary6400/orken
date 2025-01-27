import Navbar from "./Components/Layout/Navbar";
import Homepage from "./Pages/Homepage";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { Box } from "@mui/material";

function App() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  return (
    <>
      <ReactLenis root>
        <Navbar />
        <Homepage />
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "red",
          }}
        ></Box>
      </ReactLenis>
    </>
  );
}

export default App;
