import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  deletePosts,
  likePosts,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePosts);
router.patch("/:id/likeposts", auth, likePosts);
export default router;
