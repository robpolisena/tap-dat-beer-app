import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Notes from "./Notes";
import Axios from "axios";

import SimilarBeer_v2 from "./SimilarBeer_v2";
import UserReviews from "./UserReviews";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UnderBeer(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [similarBeers, setSimilarBeers] = useState([]);
  const [personalNotes, setPersonalNotes] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePersonalNotes = (e) => {
    setPersonalNotes(e.target.value);
  };

  const getSimilarBeers = () => {
    return Axios.get(
      `/api/beers/similar/${props.currentBeer.id}`
    ).then((data) => setSimilarBeers(data.data.data));
  };

  const saveNote = () => {
    const notes = { text: personalNotes, beer_id: props.currentBeer.id };
    return Axios.post("/api/notes", notes)
      .then((data) => {
        props.setOpenSB("Your note was saved");
      })
      .catch((e) => null);
  };

  const getNote = () => {
    const id = props.currentBeer.id;
    return Axios.get(`/api/notes/${id}`).then((note) => {
      if (!note.data.data) {
        setPersonalNotes("");
      } else {
        setPersonalNotes(note.data.data.text);
      }
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Reviews" />
          <Tab label="Similar Beers" onClick={() => getSimilarBeers()} />
          {props.currentUser && (
            <Tab label="Personal Notes" onClick={() => getNote()} />
          )}
          {!props.currentUser && <Tab label="Personal Notes" disabled />}
        </Tabs>
      </AppBar>
      {value === 0 && <UserReviews reviews={props.reviews} />}
      {value === 1 && (
        <SimilarBeer_v2
          onClick={props.onClick}
          beers={props.beers}
          currentBeer={props.currentBeer}
          similarBeers={similarBeers}
        />
      )}
      {value === 2 && (
        <Notes
          currentBeer={props.currentBeer}
          userNote={props.userNote}
          handlePersonalNotes={handlePersonalNotes}
          saveNote={saveNote}
          personalNotes={personalNotes}
        />
      )}
    </div>
  );
}
