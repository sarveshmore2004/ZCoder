import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchBlogPosts = (sortMethod = "oldest") => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch(`/api/blogposts?sort=${sortMethod}`);
        const data = await res.json();
        setBlogPosts(data);
      } catch (error) {
        toast.error("Failed to fetch blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [sortMethod]);

  return { blogPosts, loading };
};

export default useFetchBlogPosts;
