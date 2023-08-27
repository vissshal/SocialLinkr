import Mongoose from "mongoose";
import PostMessage from "../models/postmessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    // console.log(postMessage);
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  console.log("newpost", newPost);

  try {
    const saved = await newPost.save();

    res.json(saved);
    console.log("status sent");
  } catch (error) {
    console.log(error);

    return;
  }
};
export const updatePost = async (req, res) => {
  const post = req.body;
  const { id: _id } = req.params;

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};
export const deletePosts = async (req, res) => {
  const deletePost = await PostMessage.findByIdAndRemove(req.params.id);
  res.json({ message: "Deleted succesfully" });
};
export const likePosts = async (req, res) => {
  const post_ID = req.params.id;
  const LoggedIn_ID = req.userId;
  // console.log("LoggedIn user ka id\t", LoggedIn_ID);
  // console.log("post ka id\t", post_ID);
  // console.log("logged IN ka id\t", user.result._id);

  if (!Mongoose.Types.ObjectId.isValid(post_ID))
    return res.status(404).send("No post with that id");

  const { id } = req.params;

  if (!req.userId) {
    console.log("UnAuthenticated User");
    return res.status(404).json("UnAuthenticated User");
  }

  const post = await PostMessage.findById(post_ID);

  let index = post.likes.findIndex(checkUser);

  function checkUser(id__) {
    return id__ === req.userId;
  }

  if (index == -1) {
    post.likes.push(String(LoggedIn_ID));
    console.log("like ho gaya h... new length ", post.likes.length);
  }
  //
  else {
    post.likes = post.likes.filter((user_id) => user_id !== String(req.userId));
    console.log("already liked hai.. unlike karne jaa raha hu");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
