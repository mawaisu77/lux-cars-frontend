// GlobalNotificationComponent.js
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const GlobalNotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_ID, {
      cluster: 'ap2', 
    });

    // console.log("fwjwdirst")

    // Subscribe to the global channel
    const channel = pusher.subscribe('public-notification-23897423reh92382382');

    // Listen for 'new-notification' events on this channel
    channel.bind('Greetings', (data) => {
      console.log("data", data)
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
    });

    return () => {
      // Cleanup on component unmount
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

//   console.log(notifications)
  return (
    <div>
      <h2>Global Notifications</h2>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200">
        Global Notifications
      </h2>
      <ul className="space-y-3">
        {notifications.map((notification, index) => (
          <li 
            key={index} 
            className="p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition-all duration-200 hover:translate-x-1 cursor-pointer"
          >
            {notification}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default GlobalNotificationComponent;
