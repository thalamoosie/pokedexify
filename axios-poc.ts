import axios, { AxiosResponse } from "axios";
import { baseURL, signifier } from "./config";

interface pokemonObject {
  name: string;
  url: string;
}

const capitalizeWords = (word: string) => word[0].toUpperCase() + word.slice(1);

const pokeList: string[] = [];
async function getPokemonByEra(era: string) {
  const startTime = new Date().getTime();
  try {
    const response = await axios.get(`${baseURL}/generation/${era}`);

    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;

    // console.dir(response, { depth: null });
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(`Time: ${responseTime} ms`);

    const pokemonSpecies = response.data.pokemon_species.sort();

    pokemonSpecies.forEach((lilGuy: pokemonObject) => {
      if (lilGuy.name) pokeList.push(capitalizeWords(lilGuy.name));
    });

    pokeList.sort();

    const response2 = await getPokemon(pokeList);
  } catch (error) {
    console.error(error);
  }
}

// we will store the pokemon in an array
// Then we will call getPokemon() on the array, and for each one get the following stats:
// 0. Name
// 1. Weight
// 2. Height
// 3. Types
// These will be stored in a data object like this:
// {name: Pokeymans, height: 123, weight: 456, types: [lightning, stuff, cottoncandy]}
// Then we will loop over them and get their detailed information from the getPokemon() function by passing them in

async function getPokemon(pokemon: any) {
  try {
    console.log(pokeList);
    const requests: any[] = [];

    for (const lilGuy of pokemon) {
      const req = axios.get(`${baseURL}/${signifier}/${lilGuy.toLowerCase()}`);
      requests.push(req);
      // console.dir(response, { depth: null });
    }
    const response: AxiosResponse[] = await Promise.all(requests);

    // console.log(`Response: ${response.status} ${response.statusText}`);

    for (const res of response) {
      console.log(`Status: ${res.status} | `, res.data.weight);
    }
  } catch (error) {
    console.error(error);
  }
}

getPokemonByEra("1");
