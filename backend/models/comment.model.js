import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, ref: "BlogPost", required: true },
  parentId: { type: Schema.Types.ObjectId, default: null },
  date: { type: Date, default: Date.now },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
