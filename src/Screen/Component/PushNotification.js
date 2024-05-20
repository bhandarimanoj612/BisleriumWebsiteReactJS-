import React, { useState, useEffect } from "react";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { notification } from "antd";

const PushNotification = ({ setNotifications, setNotificationCount }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:7097/hubs/NotificationHubs")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection && connection.state === HubConnectionState.Disconnected) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveNotification", (message) => {
            const notificationColor = message.includes("error")
              ? "#f5222d" // Red color for error notifications
              : "#52c41a"; // Green color for other notifications
            notification.open({
              description: <span style={{ color: "white" }}>{message}</span>,
              placement: "bottomRight",
              style: {
                backgroundColor: notificationColor,
              },
            });
            setNotifications((prevNotifications) => [
              ...prevNotifications,
              message,
            ]);
            setNotificationCount((prevCount) => prevCount + 1);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection, setNotifications, setNotificationCount]);

  return null; // Assuming this component is only for handling push notifications
};

export default PushNotification;
