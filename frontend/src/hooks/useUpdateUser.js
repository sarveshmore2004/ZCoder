import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateUser = (clerkId) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const updateUser = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${clerkId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setUser(data);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, updateUser };
};

export default useUpdateUser;
