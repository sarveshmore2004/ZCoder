import { useState } from 'react';
import toast from 'react-hot-toast';

const useUpvoteBlogPost = (postId) => {
  const [loading, setLoading] = useState(false);
  const upvote = async (userId) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/blogposts/${postId}/upvote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (res.ok) {
        toast.success('Upvoted successfully');
        const data = await res.json();
        return data;
      } else {
        toast.error('Failed to upvote');
      }
    } catch (err) {
      toast.error('Failed to upvote');
    } finally {
      setLoading(false);
    }
  };

  return { upvote, loading };
};

export default useUpvoteBlogPost;
