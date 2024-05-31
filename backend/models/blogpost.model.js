import mongoose from "mongoose";
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  problemLink: { type: String },
  commentsCount: { type: Number, default: 0 },
  upvotes: { type: Number, default: 0 },
  tags: [{ type: String }],
  content: { type: String, required: true },
  visibility: { type: Boolean, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
