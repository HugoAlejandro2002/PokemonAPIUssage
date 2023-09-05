import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';

const CapturedPokemonCard = ({ name, type, image }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ backgroundColor: '#ffe0b2', borderRadius: '1rem', boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontFamily: '"Press Start 2P", cursive', textAlign: 'center', color: '#4a90e2' }}>
            {name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Press Start 2P", cursive', textAlign: 'center', color: '#2196F3' }}>
            Tipo: {type}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CapturedPokemonCard;
