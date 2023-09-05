import { pokeAPI } from "./apis";


export const getPokemonByID = async (pokemonID) => {
    try {
        const response = await pokeAPI.get(`pokemon/${pokemonID}`);
        return response;
    } catch (error) {
        console.error('Error al obtener los datos del Pokémon:', error);
    }
}