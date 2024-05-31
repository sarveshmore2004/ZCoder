import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useFetchUserById = (clerkId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${clerkId}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUser(data);
      } catch (error) {
        toast.error("Failed to fetch user. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [clerkId]);

  return { user, loading };
};

export default useFetchUserById;
