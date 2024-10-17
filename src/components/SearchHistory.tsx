import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import './SearchHistory.css';

interface SearchHistoryProps {
  history: {
    city: string;
    country: string;
    time: string;
  }[];
  handleDelete: (index: number) => void;
  handleSearch: (city: string, country: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, handleDelete, handleSearch }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h6">Search History</Typography>
      {/* Search history list */}
      {history?.map((entry, index) => (
        <Box
          key={index}
          className="history-card"
        >
          <Box className="history-card-content">
            <Typography>{index + 1}. </Typography>
            <Typography>{entry.city}</Typography>
          </Box>
          <Box className="history-card-content">
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
};

export default SearchHistory;
