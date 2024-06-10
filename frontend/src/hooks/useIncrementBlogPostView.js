import { useState } from 'react';
import toast from 'react-hot-toast';

const useIncrementBlogPostView = (postId) => {
  const [loading, setLoading] = useState(false);

  const incrementView = async (userId) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/blogposts/${postId}/views`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (res.ok) {
        // toast.success("View incremented successfully");
        const data = await res.json();
        return data;
      } else {
        toast.error("Failed to increment view");
      }
    } catch (err) {
      toast.error("Failed to increment view");
    } finally {
      setLoading(false);
    }
  };

  return { incrementView, loading };
};

export default useIncrementBlogPostView;
