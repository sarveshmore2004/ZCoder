import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useFetchUserById = (clerkId, isLoaded) => {

  // if (isLoaded && !clerkId) return {user:null, loading:false};

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
        // toast.error(`Failed to fetch user ${clerkId} . Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    if (isLoaded) {
      fetchUser();
    }
  }, [clerkId, isLoaded]);

  return { user, loading };
};

export default useFetchUserById;
