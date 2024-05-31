import { useState } from "react";
import toast from "react-hot-toast";

const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const createUser = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setUser(data);
      toast.success("User created successfully!");
    } catch (error) {
      toast.error("Failed to create user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, createUser };
};

export default useCreateUser;
