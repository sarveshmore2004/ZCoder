import { useState } from 'react';
import toast from 'react-hot-toast';

const useDownvoteComment = (postId, commentId) => {
  const [loading, setLoading] = useState(false);

  const downvoteComment = async (userId) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/blogposts/${postId}/comments/${commentId}/downvote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (res.ok) {
        toast.success('Comment downvoted successfully');
        const data = await res.json();
        return data;
      } else {
        toast.error('Failed to downvote comment');
      }
    } catch (err) {
      toast.error('Failed to downvote comment');
    } finally {
      setLoading(false);
    }
  };

  return { downvoteComment, loading };
};

export default useDownvoteComment;
