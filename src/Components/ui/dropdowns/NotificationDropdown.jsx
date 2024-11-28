import React, { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import Pusher from "pusher-js";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import TimeAgo from 'react-timeago'

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuthContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher("6d700b541b1d83879b18", {
      cluster: "ap2",
    });

    if (user?.id) {
      // Subscribe to the global channel

      const channel = pusher.subscribe(`public-notification-${user?.id}`);

      // Listen for 'new-notification' events on this channel
      channel.bind("user-notifications", (data) => {
        console.log("user got a notification", data);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { message: data.message },
        ]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [user?.id]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative text-left z-50 flex items-center justify-center ">
       <div className="relative flex justify-center items-center">
        <button
          onClick={toggleDropdown}
          className="text-30 font-medium text-white rounded-md focus:outline-none"
        >
          <BiBell />
          {notifications.length > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {notifications.length}
            </div>
          )}
        </button>
      </div>


      {dropdownOpen && (
         <div className="origin-top-right absolute top-10 w-80 max-h-96 overflow-y-auto rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
         {/* Notification Content */}
         <div className="py-2">
           {notifications.length > 0 ? (
             notifications.map((notification, index) => (
               <Link
                 to={notification.message.link || "#"}
                 key={index}
                 className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-50"
               >
                 <div className="flex flex-col">
                  <p className="text-xs font-bold text-gray-800">
                    {notification.message.title}
                  </p>
                   {/* Message */}
                   <p className="text-xs text-gray-800 font-medium mt-1">
                     {notification.message.message}
                   </p>
                   {/* Time */}
                   {notification.message.time && (
                     <p className="text-xs text-gray-500">
                       <TimeAgo date={notification.message.time} />
                     </p>
                   )}
                 </div>
               </Link>
             ))
           ) : (
             <p className="px-4 py-2 text-sm text-gray-500 text-center">
               No notifications
             </p>
           )}
         </div>

         {/* Clear All Button */}
         <div className="border-t border-gray-200 px-4 py-3">
           <button
             onClick={() => setNotifications([])}
             className="w-full text-center text-xs font-medium text-blue-600 hover:text-blue-500"
           >
             Clear All Notifications
           </button>
         </div>
       </div>

      )}
    </div>
  );
};

export default NotificationDropdown;
