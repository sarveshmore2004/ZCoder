import { useState } from 'react';
import toast from 'react-hot-toast';

const useUpdateBlogPost = () => {
  const [loading, setLoading] = useState(false);

  const updateBlogPost = async (postId, updatedPost) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogposts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (res.ok) {
        toast.success("Blog post updated successfully");
      } else {
        toast.error("Failed to update blog post");
      }
    } catch (error) {
      toast.error("Failed to update blog post");
    } finally {
      setLoading(false);
    }
  };

  return { updateBlogPost, loading };
};

export default useUpdateBlogPost;
