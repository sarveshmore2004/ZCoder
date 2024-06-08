import { useState, useEffect } from 'react';

const useFetchBlogPostbyId = (id, sortMethod) => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogposts/${id}?sort=${sortMethod}`);
      const data = await res.json();
      setBlogPost(data);
    } catch (error) {
        toast.error("Failed to fetch blog post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, [id, sortMethod]);

  return { blogPost, loading };
};

export default useFetchBlogPostbyId;
