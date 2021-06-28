import AxiosMockAdapter from "axios-mock-adapter";
import axios from "./axios";

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 0,
});

axiosMockAdapter.onPost("http://localhost:5000/researcher/investigation/00287041-3df4-438f-b60a-e1d85dbe25b9/share").reply(200, {
    users: [{ id: 1, name: "John Smith" }],
}); 

export default axiosMockAdapter;
