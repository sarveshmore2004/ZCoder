import { useState } from 'react';
import toast from 'react-hot-toast';

const useDownvoteBlogPost = (postId) => {
  const [loading, setLoading] = useState(false);
  const downvote = async (userId) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/blogposts/${postId}/downvote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (res.ok) {
        // toast.success('Downvoted successfully');
        const data = await res.json();
        return data;
      } else {
        toast.error('Failed to downvote');
      }
    } catch (err) {
      toast.error('Failed to downvote');
    } finally {
      setLoading(false);
    }
  };

  return { downvote, loading };
};

export default useDownvoteBlogPost;
