import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchBlogPostbyId = (postId) => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const res = await fetch(`/api/blogposts/${postId}`);
        const data = await res.json();
        setBlogPost(data);
      } catch (error) {
        toast.error("Failed to fetch blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [postId]);

  return { blogPost, loading };
};

export default useFetchBlogPostbyId;
