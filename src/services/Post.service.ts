import axios from "axios";
import API_URL from "../utils/baseUrl";

const getEvents = () => axios.get(`${API_URL}/post/get`);

const EventService = {
  getEvents,
};

export default EventService;
