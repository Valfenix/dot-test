import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import PostService from "./../services/Post.service";
import "./event.css";
import openSocket from "socket.io-client";

// Import and initiate sockets for realtime data polling
const socket = openSocket("https://dot-t.herokuapp.com", {
  transports: ["websocket"],
});

const EventTable = () => {
  const [POSTLIST, setPostList] = useState([]);

  useEffect(() => {
    PostService.getEvents().then(
      (response: any) => {
        setPostList(response.data.data.data);
      },
      (error: any) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        console.log(_content);
      }
    );
  }, []);

  // Hook for sockets
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });
    socket.on("fetch", (response) => {
      setPostList(response.data);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, []);

  return (
    <div className="container event-table">
      <Link className="home-button" to="/">
        Go back to home
      </Link>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event date</th>
            <th>Page title</th>
            <th>Page description</th>
            <th>Page tags</th>
            <th>User ID</th>
            <th>User joined</th>
          </tr>
        </thead>
        <tbody>
          {POSTLIST.map((row: any) => (
            <tr key={row?.id}>
              <td>{row?.id}</td>
              <td>{row?.created_at}</td>
              <td>{row?.page?.title}</td>
              <td>{row?.page?.description}</td>
              <td>{row?.page?.tags.join(",")}</td>
              <td>{row?.user?.id}</td>
              <td>{row?.user?.created_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EventTable;
