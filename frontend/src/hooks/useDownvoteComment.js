import { useState } from "react";
import toast from "react-hot-toast";

const useDownvoteComment = (postId) => {
  const downvoteComment = async (commentId, userId) => {
    try {
      const res = await fetch(`/api/blogposts/${postId}/comments/${commentId}/downvote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (res.ok) {
        // toast.success("Comment downvoted successfully");
        const data = await res.json();
        return data;
      } else {
        toast.error("Failed to downvote comment");
      }
    } catch (err) {
      toast.error("Failed to downvote comment");
    }
  };

  return { downvoteComment };
};

export default useDownvoteComment;
