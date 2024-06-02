import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useCreateBlogPost = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createBlogPost = async (newPost) => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogposts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (res.ok) {
        toast.success("Blog post created successfully");
        navigate('/dashboard');
      } else {
        toast.error("Failed to create blog post");
      }
    } catch (error) {
      toast.error("Failed to create blog post");
    } finally {
      setLoading(false);
    }
  };

  return { createBlogPost, loading };
};

export default useCreateBlogPost;
