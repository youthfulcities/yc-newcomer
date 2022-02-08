import React from "react";
import { Typography, Grid } from "@mui/material";

const PhotoHeader = ({ src, alt, children }) => {
  return (
    <>
      <div className="photoHeaderContainer">
        <img className="photoHeaderImg" src={src} alt={alt} />
        <Grid
          container
          sx={{ minHeight: "300px" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          pt="10vh"
        >
          <Typography className="photoHeaderText" variant="h1" color="#fff">
            {children}
          </Typography>
        </Grid>
        <div className="photoHeaderOverlay"></div>
      </div>
    </>
  );
};

export default PhotoHeader;
