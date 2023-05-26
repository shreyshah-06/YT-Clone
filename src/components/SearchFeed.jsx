import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos,Pagination } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
  const[currentPage,setCurrentPage]=useState(1);
  const[postsPerPage,setPostsPerPage]=useState(15);
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm]);
  const lastPostIndex=currentPage*postsPerPage;
  const firstPostIndex=lastPostIndex-postsPerPage;
  let videosPaginated =null;
  if(videos!=null) {
    videosPaginated = videos.slice(firstPostIndex,lastPostIndex);
  }
  return (
    <Box p={2} minHeight="95vh">
      <Typography variant="h4" fontWeight={900}  color="white" mb={3} ml={{ sm: "100px"}}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: '100px' } }}/>
        {<Videos videos={videosPaginated} />}
      </Box>
        <Pagination totalPosts={videos?.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    </Box>
  );
};

export default SearchFeed;