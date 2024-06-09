import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchBlogPosts = (sortMethod = "recent", page = 1, limit = 5, tags = [], platform = "", problemLink = "") => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const tagsQuery = tags.join(',');
        const res = await fetch(`/api/blogposts?sort=${sortMethod}&page=${page}&limit=${limit}&tags=${tagsQuery}&platform=${platform}&problemLink=${problemLink}`);
        const data = await res.json();
        setBlogPosts(data.blogPosts);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error("Failed to fetch blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [sortMethod, page, limit, tags, platform, problemLink]);

  return { blogPosts, loading, totalPages };
};

export default useFetchBlogPosts;
