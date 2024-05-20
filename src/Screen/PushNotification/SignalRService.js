// SignalRService.js
import { HubConnectionBuilder } from "@microsoft/signalr";

const baseUrl = "https://localhost:7097";

const startConnection = async () => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${baseUrl}/hubs/NotificationHubs`)
    .withAutomaticReconnect()
    .build();

  try {
    await connection.start();
    console.log("SignalR Connected.");
  } catch (err) {
    console.error("SignalR Connection Error: ", err);
  }

  return connection;
};

const registerReceiveNotificationHandler = (connection, callback) => {
  connection.on("ReceiveNotification", (message) => {
    callback(message);
  });
};

export { startConnection, registerReceiveNotificationHandler };
