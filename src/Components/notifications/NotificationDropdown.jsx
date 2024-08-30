import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import io from "socket.io-client";
import moment from "moment";
import baseService from "../../services/baseService";
import { useNavigate } from "react-router-dom";

const socket = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:8000");

const NotificationDropdown = ({ user, color }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const navigate = useNavigate();

  const toggleDropdown = async () => {
    setDropdownOpen(!dropdownOpen);

    if (!dropdownOpen) {
      // When opening the dropdown, mark all notifications as read
      await markAllAsRead();
    }
  };

  const markAllAsRead = async () => {
    try {
      await baseService.post(`notifications/mark-all-as-read`);

      // Update local state to mark all notifications as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnseenCount(0); // Reset unseen count
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const handleClearNotifications = async () => {
    try {
      await baseService.post(`notifications/mark-as-clear`);

      // Clear notifications from local state
      setNotifications([]);

      setUnseenCount(0); // Reset unseen count
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  useEffect(() => {
    if (user) {
      socket.emit("register", user);

      const fetchNotifications = async () => {
        try {
          const response = await baseService.get(`notifications`);
          const formattedNotifications = response.data.data.map((notification) => ({
            ...notification,
            time: moment(notification.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
          }));
          setNotifications(formattedNotifications);

          setUnseenCount(formattedNotifications.filter((n) => !n.isRead).length);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      fetchNotifications();

      socket.on("bidExpired", (data) => {
        const newNotification = {
          id: Date.now(),
          message: data.message,
          time: moment().format("MMMM Do YYYY, h:mm:ss a"),
          isRead: false,
        };

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
        setUnseenCount((prevCount) => prevCount + 1);
      });

      return () => {
        socket.off("bidExpired");
      };
    }
  }, [user]);

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <div className="relative">
          <FaBell
            size={23}
            onClick={toggleDropdown}
            className={`cursor-pointer ${color ? 'text-[#7A798A]' : 'text-white'} `}
          />
          {unseenCount > 0 && (
            <span className="absolute -top-1 right-0 block w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unseenCount}
            </span>
          )}
        </div>
      </div>

      {dropdownOpen && (
        <div className="origin-top-right absolute h-[200px] overflow-y-scroll right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-100 duration-200 text-sm text-gray-700 border-b border-gray-200 ${
                    notification.isRead ? "text-gray-500" : "font-bold"
                  }`}
                >
                  <p>{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                  <p className="text-xs text-gray-500">{notification.isread ?"read":"not read"}</p>
                </div>
              ))
            ) : (
              <p className="px-4 py-2 text-sm text-gray-500">
                No notifications
              </p>
            )}
          </div>
          <div className="px-4 py-2">
            <button
              onClick={handleClearNotifications}
              className="block text-center text-sm font-bold text-blue-500 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
