import { useState } from 'react';
import toast from 'react-hot-toast';

const useUpvoteComment = (postId, commentId) => {
  const [loading, setLoading] = useState(false);

  const upvoteComment = async (userId) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/blogposts/${postId}/comments/${commentId}/upvote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (res.ok) {
        toast.success('Comment upvoted successfully');
        const data = await res.json();
        return data;
      } else {
        toast.error('Failed to upvote comment');
      }
    } catch (err) {
      toast.error('Failed to upvote comment');
    } finally {
      setLoading(false);
    }
  };

  return { upvoteComment, loading };
};

export default useUpvoteComment;
