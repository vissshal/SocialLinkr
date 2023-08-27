import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";
import useStyles from "./styles";
const Post = ({ post, currentId, setCurrentId }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  let index = -1;
  index = post.likes.findIndex(checkUser);

  function checkUser(id__) {
    if (user == null || user.result == null) return -1;
    return id__ === user.result._id;
  }

  if (user !== null && post.creator === user.result._id) {
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body1" color="primary" component="p">
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            disabled={!user?.result}
            color="default"
            onClick={() => {
              dispatch(likePost(post._id));
            }}
          >
            <span>
              {index == -1 ? (
                <ThumbUpAltIcon fontSize="default" />
              ) : (
                <ThumbDownAltIcon fontSize="default" />
              )}
            </span>

            {post.likes.length}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
  //
  else {
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body1" color="primary" component="p">
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="default"
            disabled={!user?.result}
            onClick={() => {
              dispatch(likePost(post._id));
            }}
          >
            <span>
              {index == -1 || !user ? (
                <ThumbUpAltIcon fontSize="default" />
              ) : (
                <ThumbDownAltIcon fontSize="default" />
              )}
            </span>

            {post.likes.length}
          </Button>
        </CardActions>
      </Card>
    );
  }
};

export default Post;
