import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchNotifications = (clerkId, isLoaded) => {
  const [notifications, setNotifications] = useState([]);
  const [notiCount, setNotiCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/users/${clerkId}/notifications`);
        const data = await res.json();
        setNotifications(data.notifications);
        setNotiCount(data.noti_count);
      } catch (error) {
        toast.error("Error fetching notifications");
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      fetchNotifications();
    }
  }, [clerkId, isLoaded]);

  return { notifications, notiCount, loading };
};

export default useFetchNotifications;
