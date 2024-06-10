import { useState } from 'react';
import toast from 'react-hot-toast';

const useFavoriteBlogPost = (postId) => {
  const [loading, setLoading] = useState(false);

  const favorite = async (userId) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/blogposts/${postId}/favorite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (res.ok) {
        // toast.success('Added to favorites successfully');
        const data = await res.json();
        return data;
      } else {
        toast.error('Failed to add to favorites');
      }
    } catch (err) {
      toast.error('Failed to add to favorites');
    } finally {
      setLoading(false);
    }
  };

  return { favorite, loading };
};

export default useFavoriteBlogPost;
