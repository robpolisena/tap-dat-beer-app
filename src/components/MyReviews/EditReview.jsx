import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

export default function EditReview(props) {
  const [review, setReview] = useState(props.review);

  const handleChange = (event) => {
    if (event.target.value >= 1 && event.target.value <= 5) {
      setReview({ ...review, [event.target.name]: event.target.value });
    }
  };

  const handleChangeText = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value });
  };

  const editAndSubmit = (event) => {
    event.preventDefault();
    return axios
      .put(`/api/reviews/${review.id}`, review)
      .then((data) => {
        //its now time to update the state of the existing review id.  Update the review.
        //option to refresh all my reviews.
        props.close();
        props.handleEditReviewUpdate();

        //props another function  happens in app.js
      })
      .catch((error) => {
        console.log("Error editting review: ", error);
      });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={editAndSubmit}>
          <DialogTitle id="form-dialog-title">Update Your Review</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="sweet"
              label="Current Sweetness:"
              type="number"
              name="sweet"
              value={review.sweet}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="bitter"
              label="Current Bitterness:"
              type="number"
              name="bitter"
              value={review.bitter}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="hoppy"
              label="Current Hoppiness"
              type="number"
              name="hoppy"
              value={review.hoppy}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="sour"
              label="Current Sourness"
              type="number"
              name="sour"
              value={review.sour}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="rank"
              label="Current Rank"
              type="number"
              name="rank"
              value={review.rank}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              inputProps={{ size: 80 }}
              //margin="dense"
              id="outlined-basic"
              variant="outlined"
              label=""
              type="text"
              name="review"
              value={review.review}
              //fullWidth
              onChange={handleChangeText}
            />
          </DialogContent>
          {/* <CustomAlert errMessage={props.errMessage} /> */}

          <DialogActions>
            <Button onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
