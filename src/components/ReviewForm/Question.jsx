import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

import { makeStyles } from "@material-ui/styles";
const userStyles = makeStyles((theme) => ({
  root: {
    height: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: "larger",
  },
}));

const buttonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
    left: "30%",
    width: "min-content",
    margin: 20,
    // paddingLeft: 20,
    //paddingRight: 30,
    //paddingBottom: 0,
  },
}));

const textStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    left: "5%",
    //right: "10%",
    //margin: 20,
    // paddingLeft: 20,
    paddingRight: "10%",
    //paddingBottom: 20,
  },
}));

const inputProps = {
  step: 300,
};

export default function Question(props) {
  const classes = userStyles();
  const button = buttonStyles();
  const text = textStyles();

  const setQuestion = (id) => {
    props.setQuestion(id);
    props.nextQuestion(id);
  };
  const submitReview = () => {
    props.nextAndSubmit();
  };

  const answers = [1, 2, 3, 4, 5];
  const buttons = answers.map((elm) => {
    return (
      <Button
        className={classes.root}
        size="large"
        variant="contained"
        color="primary"
        onClick={() => setQuestion(`${elm}`)}
      >
        {elm}
      </Button>
    );
  });

  return (
    <>
      <DialogTitle id="form-dialog-title">{props.question}</DialogTitle>
      {props.finalQuestion && (
        <>
          <TextField
            className={text.root}
            inputProps={{ size: 80 }}
            id="outlined-basic"
            label=""
            variant="outlined"
            aria-label="empty textarea"
            onChange={props.handleQuestionF}
            placeholder="Type here"
          />
          <Button
            className={button.root}
            size="medium"
            color="primary"
            variant="contained"
            onClick={() => submitReview()}
          >
            Submit
          </Button>
        </>
      )}
      {!props.finalQuestion && <div className={classes.root}>{buttons}</div>}
    </>
  );
}
