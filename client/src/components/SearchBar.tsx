import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const setSearchQuery = (inputQuery: string) => {
    // Search for input in db
  };

  return (
    <Box justifyContent='center' alignItems="center" >
      <form>
        <TextField
          id="search-bar"
          className="text"

          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
          }}
          label="Enter a community name or city"
          variant="outlined"
          placeholder="Search..."
          size="small"
          style={{marginBottom:'16px', marginLeft:'10px'}}
        />
        
      </form>
    </Box>
  );
};

export default SearchBar;
