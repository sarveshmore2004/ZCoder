import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "https://via.placeholder.com/150" },
    bio: { type: String },
    bookmarks: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    codingProfiles: {
      leetcode: { type: String },
      codeforces: { type: String },
      codechef: { type: String },
      atcoder: { type: String },
    },
    socialProfiles: {
      github: { type: String },
      linkedin: { type: String },
    },
    recentActivity: {
      comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      posts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
    },
    languages: [{ type: String }], // Add languages
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
