import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import {Sidebar,Videos,Pagination} from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [videos, setVideos] = useState(null);
  const[currentPage,setCurrentPage]=useState(1);
  const[postsPerPage,setPostsPerPage]=useState(15);
  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data)=>{setVideos(data.items)})

    }, [selectedCategory]);

    const lastPostIndex=currentPage*postsPerPage;
    const firstPostIndex=lastPostIndex-postsPerPage;
    let videosPaginated =null;
    if(videos!=null) {
      videosPaginated = videos.slice(firstPostIndex,lastPostIndex);
    }
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
          Copyright © 2023 Shrey
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory}
        </Typography>

        <Videos videos={videosPaginated} />
      <Pagination totalPosts={videos?.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </Box>
    </Stack>
  );
};

export default Feed;