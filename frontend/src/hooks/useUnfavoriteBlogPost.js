import { useState } from 'react';
import toast from 'react-hot-toast';

const useUnfavoriteBlogPost = (postId) => {
  const [loading, setLoading] = useState(false);

  const unfavorite = async (userId) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/blogposts/${postId}/unfavorite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (res.ok) {
        // toast.success('Removed from favorites successfully');
        const data = await res.json();
        return data;
      } else {
        toast.error('Failed to remove from favorites');
      }
    } catch (err) {
      toast.error('Failed to remove from favorites');
    } finally {
      setLoading(false);
    }
  };

  return { unfavorite, loading };
};

export default useUnfavoriteBlogPost;
