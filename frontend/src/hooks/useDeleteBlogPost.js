import { useState } from 'react';
import toast from 'react-hot-toast';

const useDeleteBlogPost = () => {
  const [loading, setLoading] = useState(false);

  const deleteBlogPost = async (postId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogposts/${postId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success("Blog post deleted successfully");
      } else {
        toast.error("Failed to delete blog post");
      }
    } catch (error) {
      toast.error("Failed to delete blog post");
    } finally {
      setLoading(false);
    }
  };

  return { deleteBlogPost, loading };
};

export default useDeleteBlogPost;
