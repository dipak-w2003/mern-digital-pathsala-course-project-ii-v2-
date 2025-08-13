import axios from "axios";

const teacherApi = axios.create({
  baseURL: "http://localhost:4406/api/teacher",
  headers: {
    // plain text/json data
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default teacherApi;
