import { useEffect, useState } from 'react';
import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material';
import "./App.css";
import { internarAPI } from './services/apis';
import PokeCard from './components/PokeCard';
import CapturedPokemonCard from './components/CapturedPokemonCard';
import { getRandomPokemonNumbers } from './helpers/pokmonNumbers';

function App() {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [capturedPokemons, setCapturedPokemons] = useState<any[]>([]);

  useEffect(() => {
    setRandomNumbers(getRandomPokemonNumbers());
    internarAPI.get('pokemons')
      .then(response => {
        setCapturedPokemons(response.data);
      })
      .catch(error => {
        console.error('Error al cargar Pokémon capturados:', error);
      });
  }, []);

  const catchPokemon = async (dataPokemon) => {
    try {
      await internarAPI.post('pokemons', {
        name: dataPokemon.name,
        type: dataPokemon.type,
        image: dataPokemon.image,
      });
      setRandomNumbers(getRandomPokemonNumbers());
      internarAPI.get('pokemons')
        .then(response => {
          setCapturedPokemons(response.data);
        })
        .catch(error => {
          console.error('Error al cargar Pokémon capturados:', error);
        });
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xl" style={{ backgroundColor: '#f0f0f0' }}>
      <Box sx={{
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontFamily: '"Press Start 2P", cursive', color: '#f28500' }}>
          Pokémon Aleatorios
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {randomNumbers.map((number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={number} sx={{ maxWidth: '200px', padding: '0 10px' }}>
              <PokeCard pokemonNumber={number} catchPokemon={catchPokemon} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{
        paddingTop: 5,
        paddingBottom: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '1rem',
        margin: '20px 0',
        paddingLeft: 20,
        paddingRight: 20,
      }}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: '"Press Start 2P", cursive', color: '#f28500', margin: 20 }}>
          Pokémon Capturados
        </Typography>
        <Grid container spacing={4}>
          {capturedPokemons.map((pokemon, index) => (
            <CapturedPokemonCard key={index} name={pokemon.name} type={pokemon.type} image={pokemon.image} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
