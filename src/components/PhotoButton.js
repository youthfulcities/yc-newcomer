import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

const PhotoButton = ({ city, src, alt, factoid, children }) => {
  const formattedNumber = (number) => {
    return number.toLocaleString();
  };

  return (
    <>
      <Link to={`/about/${city}`}>
        <Box className="photoButtonContainer" sx={{ boxShadow: 2 }}>
          <img className="photoButtonImg" src={src} alt={alt} />
          <Grid
            container
            sx={{ minHeight: "100px" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                pl="35px"
                color="#FFF"
                className="photoButtonText"
                variant="h2"
              >
                {children}
              </Typography>
              <Typography
                pl="35px"
                color="#FFF"
                className="photoButtonText"
                variant="h4"
              >
                Province
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                pr="35px"
                align="right"
                color="#FFF"
                className="smallPhotoButtonText"
                variant="h5"
              >
                Population: {formattedNumber(factoid)}
                <br />
                Immigrant population: ???
              </Typography>
            </Grid>
          </Grid>
          <div className="photoOverlay"></div>
        </Box>
      </Link>
    </>
  );
};

export default PhotoButton;