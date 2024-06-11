import { useState } from 'react';
import toast from 'react-hot-toast';

const useAddCommentToBlogPost = (postId) => {
  const [loading, setLoading] = useState(false);

  const addComment = async (content, author, parentId = null , replyingToId = null) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogposts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content,
          author,
          parentId,
          replyingToId
        })
      });

      if (res.ok) {
        toast.success("Comment added successfully");
        const data = await res.json();
        return data;
      } else {
        toast.error("Failed to add comment");
      }
    } catch (err) {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return { addComment, loading };
};

export default useAddCommentToBlogPost;
