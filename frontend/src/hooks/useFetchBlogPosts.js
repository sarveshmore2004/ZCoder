import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch('/api/blogposts');
        const data = await res.json();
        setBlogPosts(data);
      } catch (error) {
        toast.error("Failed to fetch blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return { blogPosts, loading };
};

export default useFetchBlogPosts;
