import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Button, Grid, Box } from '@mui/material';
import { pokeAPI } from '../services/apis';

const PokeCard = ({ pokemonNumber, catchPokemon }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await pokeAPI.get(`pokemon/${pokemonNumber}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del Pokémon:', error);
      }
    }

    fetchData();
  }, [pokemonNumber]);

  return (
    <div>
      {pokemonData ? (
        <Card sx={{ backgroundColor: '#ffe0b2', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontFamily: '"Press Start 2P", cursive', textAlign: 'center', color: '#4a90e2' }}>
              {pokemonData.name}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="140"
            image={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Press Start 2P", cursive', textAlign: 'center', color: '#4CAF50' }}>
                  Ataque: {pokemonData.stats[1]?.base_stat || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Press Start 2P", cursive', textAlign: 'center', color: '#2196F3' }}>
                  Tipo: {pokemonData.types[0]?.type.name || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#ff5252',
                  borderRadius: '1rem',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.8rem',
                  '&:hover': {
                    backgroundColor: '#ff3d00',
                  }
                }}
                onClick={() => catchPokemon({
                  name: pokemonData.name,
                  type: pokemonData.types[0]?.type.name || "N/A",
                  image: pokemonData.sprites.front_default,
                })}
              >
                Capturar
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </div>

  );
};

export default PokeCard;
