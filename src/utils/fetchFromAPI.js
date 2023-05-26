import axios from "axios";
const baseUrl = "https://youtube-v31.p.rapidapi.com";
const options = {
    params: {
      maxResults: '45'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

export const fetchFromAPI = async (url) => {
   const {data} =  await axios.get(`${baseUrl}/${url}`,options);
   return data;
}