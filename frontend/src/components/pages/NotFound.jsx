import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h1" component="div" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h5" component="div" sx={{ mb: 4 }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        component={NavLink}
        to="/"
        sx={{ textTransform: 'none' }}
      >
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFound;
