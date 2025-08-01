import React, { useState, useRef } from "react";
import { Box, Grow, Popper, Typography } from "@mui/material";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button onClick={handleClick}>Open Dropdown</button>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        modifiers={[
          {
            name: "arrow",
            enabled: true,
            options: { element: arrowRef.current },
          },
        ]}
        onMouseLeave={handleClose}
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "left top" }}>
            <Box
              sx={{
                position: "relative",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                mt: 2,
                minWidth: 200,
              }}
            >
              <Box
                component="span"
                ref={arrowRef}
                sx={{
                  position: "absolute",
                  width: 16,
                  height: 16,
                  bgcolor: "background.paper",
                  transform: "rotate(45deg)",
                  top: -8,
                  left: 24,
                  boxShadow: 3,
                  zIndex: 0,
                }}
              />
              <Typography variant="body1" color="text.primary">
                Dropdown content here
              </Typography>
            </Box>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default Navbar;
