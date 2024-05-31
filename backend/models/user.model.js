import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "https://via.placeholder.com/150" },
    bio: { type: String, default: "Hey I am using ZCoder" },
    bookmarks: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    codingProfiles: {
      leetcode: { type: String, default: "" },
      codeforces: { type: String, default: "" },
      codechef: { type: String, default: "" },
      atcoder: { type: String, default: "" },
    },
    socialProfiles: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    recentActivity: {
      comments: { type: [Schema.Types.ObjectId], ref: "Comment", default: [] },
      posts: { type: [Schema.Types.ObjectId], ref: "BlogPost", default: [] },
    },
    languages: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
