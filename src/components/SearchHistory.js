import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

function SearchHistory({ history, handleDelete, handleSearch }) {
    return (
        <div style={{ marginTop: '20px' }}>
            <Typography variant="h6">Search History</Typography>
            {/* search history list */}
            {history.map((entry, index) => (
                <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    padding="5px 15px"
                    borderRadius="16px"
                    backgroundColor="rgba(255, 255, 255, 0.4)"
                    marginBottom="10px"
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap='10px'            
                    >
                        <Typography>{index + 1}. </Typography>
                        <Typography>{entry.city}</Typography>
                    </Box>
                    <Box  
                        display="flex"
                        alignItems="center"
                    >
                        <Typography style={{ marginRight: '10px' }}>{entry.time}</Typography>
                        <IconButton onClick={() => handleSearch(entry.city.split(",")[0], entry.country)}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}
        </div>
    );
}

export default SearchHistory;
