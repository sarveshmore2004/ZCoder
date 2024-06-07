import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useFetchUsers = ( search = "" ,page = 1, limit = 2) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users?page=${page}&limit=${limit}&search=${search}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, search]);

  return { users, loading, totalPages };
};

export default useFetchUsers;
