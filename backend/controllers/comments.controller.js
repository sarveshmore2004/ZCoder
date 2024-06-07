import Comment from "../models/comment.model.js";

// Upvote a comment
export const upvoteComment = async (req, res) => {
  try {
    const { userId } = req.body;
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!comment.upvotes.includes(userId)) {
      comment.upvotes.push(userId);
    }
    if (comment.downvotes.includes(userId)) {
      comment.downvotes = comment.downvotes.filter(id => id.toString() !== userId);
    }

    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Downvote a comment
export const downvoteComment = async (req, res) => {
  try {
    const { userId } = req.body;
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!comment.downvotes.includes(userId)) {
      comment.downvotes.push(userId);
    }
    if (comment.upvotes.includes(userId)) {
      comment.upvotes = comment.upvotes.filter(id => id.toString() !== userId);
    }

    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
