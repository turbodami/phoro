const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Discussion = require("../../models/Discussion");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route    POST api/discussions
//@desc     create a discussion
//@access   private
router.post(
  "/",
  [
    auth,
    [
      check("text", "text is required").not().isEmpty(),
      check("source", "source is required").not().isEmpty(),
      check("link", "link is required").not().isEmpty(),
      check("avatar", "avatar is required").not().isEmpty(),
      check("image", "image is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      if (
        user.email === "tolarianwiz@gmail.com" ||
        user.email === "niko.ramponi@gmail.com"
      ) {
        const newDiscussion = new Discussion({
          text: req.body.text,
          source: req.body.source,
          avatar: req.body.avatar,
          link: req.body.link,
          image: req.body.image,
        });

        const discussion = await newDiscussion.save();

        res.json(discussion);
      } else {
        res.status(401).json({ msg: "you can't discussion dude!" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route    GET api/discussions
//@desc     get all discussions
//@access   public
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ date: -1 });
    res.json(discussions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route    GET api/discussions/:id
//@desc     get discussion by id
//@access   public
router.get("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ msg: "discussion not found" });
    }

    res.json(discussion);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "discussion not found" });
    }
    res.status(500).send("server error");
  }
});

//@route    DELETE api/discussions/:id
//@desc     delete a discussion
//@access   private
router.delete("/:id", auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");

    if (!discussion) {
      return res.status(404).json({ msg: "discussion not found" });
    }

    if (
      user.email === "tolarianwiz@gmail.com" ||
      user.email === "niko.ramponi@gmail.com"
    ) {
      await discussion.remove();
    } else {
      return res.status(401).json({ msg: "user not authorized!" });
    }

    res.json(discussion);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "discussion not found" });
    }

    res.status(500).send("server error");
  }
});

//@route    PUT api/discussions/access/:id
//@desc     gain access to a discussion
//@access   private
router.put("/access/:id", auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    //check if already gained access
    if (
      discussion.access.filter(
        (verified) => verified.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "access already gained!" });
    }
    discussion.access.unshift({ user: req.user.id });

    await discussion.save();
    res.json(discussion.access);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route    PUT api/discussions/like/:id
//@desc     like a discussion
//@access   private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    //check if already liked
    if (
      discussion.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "discussion already liked!" });
    }
    discussion.likes.unshift({ user: req.user.id });

    await discussion.save();
    res.json(discussion.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route    PUT api/discussions/like/:id
//@desc     unlike a discussion
//@access   private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    //check if already liked
    if (
      discussion.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "discussion has not yet been liked!" });
    }
    //get remove index
    const removeIndex = discussion.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    discussion.likes.splice(removeIndex, 1);

    await discussion.save();
    res.json(discussion.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route    POST api/discussions/comment/:id
//@desc     comment on a discussion
//@access   private
router.post(
  "/comment/:id",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const discussion = await Discussion.findById(req.params.id);

      //check if user can comment
      if (
        discussion.access.filter(
          (verified) => verified.user.toString() === req.user.id
        ).length > 0
      ) {
        const newComment = {
          text: req.body.text,
          avatar: user.avatar,
          user: req.user.id,
        };

        discussion.comments.unshift(newComment);
        await discussion.save();
      } else {
        return res.status(401).json({ msg: "user can't discuss here!" });
      }
      res.json(discussion.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route    DELETE api/discussions/comment/:id/:comment_id
//@desc     delete comment
//@access   private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    //pull out comment
    const comment = discussion.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "comment does not exist" });
    }

    //check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }

    //get remove index
    const removeIndex = discussion.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    discussion.comments.splice(removeIndex, 1);

    await discussion.save();
    res.json(discussion.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
