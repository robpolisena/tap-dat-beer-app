import React from "react";
import BeerCard from "./BeerCard";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import StarBorderIcon from "@material-ui/icons/StarBorder";

import "./Category.css";
import { GridList, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    // color: theme.palette.primary.light,
    color: "#fff",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function Category(props) {
  let first10Beers = [];

  if (props.beers.length > 10) {
    for (let i = 1; i <= 10; i++) {
      first10Beers.push(props.beers[i]);
    }
  } else {
    first10Beers = [...props.beers];
  }

  let columns = 2.5;

  const theme = useTheme();
  const xsmall = useMediaQuery(theme.breakpoints.up("xs"));
  const betweenXSAndS = useMediaQuery("(min-width: 425px)");
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  const large = useMediaQuery(theme.breakpoints.up("lg"));

  console.log("matches: ", small);

  if (large) {
    columns = 4;
  } else if (medium) {
    columns = 3;
  } else if (small) {
    columns = 2;
  } else if (betweenXSAndS) {
    columns = 1.5;
  }

  console.log("first10beers: ", first10Beers);
  if (props.categories) {
    console.log("categories: ", props.category);
  }
  const classes = useStyles();
  return (
    <div>
      <Box
        component="div"
        width={0.9}
        className={classes.root}
        m={"auto"}
        maxWidth={true}
      >
        {/* <h3 className="category_title">Popular >></h3> */}
        <Box width={1} component="h3" mb={"1rem"} mt={"1rem"} textAlign="left">
          <Typography variant="h5" component="h3" mb={2}>
            {props.category}
          </Typography>
        </Box>

        {/* <Grid container spacing={3} justify="space-around"> */}
        <GridList
          className={classes.gridList}
          cols={columns}
          cellHeight={"150"}
        >
          {/* <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[2]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[3]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[4]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[5]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[6]} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <BeerCard beer={props.beers[7]} />
          </Grid> */}

          {first10Beers.map((beer) => (
            <GridListTile
              key={beer.beer_image}
              component="a"
              href="#"
              onClick={props.onClick}
              xs={12}
            >
              <img src={beer.beer_image} alt={beer.name} />

              <GridListTileBar
                title={beer.name}
                classes={{ root: classes.titleBar, title: classes.title }}
                actionIcon={
                  <IconButton aria-label={`star ${beer.name}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>

        {/* </Grid> */}
      </Box>
    </div>
  );
}