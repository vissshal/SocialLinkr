import React from "react";
import Post from "../Posts/Post/Post";
import { CircularProgress, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const Posts = ({ setCurrentId, CurrentId }) => {
  const styles = useStyles();
  const posts = useSelector((state) => state.posts);
  // console.log(posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map(
        (post) =>
          post && (
            <Grid key={post._id} item xs={10} sm={6}>
              <Post
                post={post}
                CurrentId={CurrentId}
                setCurrentId={setCurrentId}
              />
            </Grid>
          )
      )}
    </Grid>
  );
};

export default Posts;
