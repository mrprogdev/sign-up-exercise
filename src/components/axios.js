import axios from "axios";

export const userAuth = axios.create({
  baseURL:
    "https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production",
});
