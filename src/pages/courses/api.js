import Axios from "axios";
import { API_URL } from "../../store/actions";

export const courseById = async (id)  => {
    const res = await Axios.get(`${API_URL}/courseById/${id}`,{
         });
    return res
  }
  export const updateTopics = async (id,data)  => {
    const res = await Axios.put(`${API_URL}/update-topics/${id}`,data);
    return res
  }