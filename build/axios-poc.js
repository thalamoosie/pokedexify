"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const capitalizeWords = (word) => word[0].toUpperCase() + word.slice(1);
const pokeList = [];
function getPokemonByEra(era) {
    return __awaiter(this, void 0, void 0, function* () {
        const startTime = new Date().getTime();
        try {
            const response = yield axios_1.default.get(`${config_1.baseURL}/generation/${era}`);
            const endTime = new Date().getTime();
            const responseTime = endTime - startTime;
            // console.dir(response, { depth: null });
            console.log(`Response: ${response.status} ${response.statusText}`);
            console.log(`Time: ${responseTime} ms`);
            const pokemonSpecies = response.data.pokemon_species.sort();
            pokemonSpecies.forEach((lilGuy) => {
                if (lilGuy.name)
                    pokeList.push(capitalizeWords(lilGuy.name));
            });
            pokeList.sort();
            const response2 = yield getPokemon(pokeList);
            console.log(response2);
        }
        catch (error) {
            console.error(error);
        }
    });
}
// we will write them to a CSV!
// Then we will loop over them and get their detailed information from the getPokemon() function by passing them in
function getPokemon(pokemon) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(pokeList);
            const requests = [];
            for (const lilGuy of pokemon) {
                const req = axios_1.default.get(`${config_1.baseURL}/${config_1.signifier}/${lilGuy.toLowerCase()}`);
                requests.push(req);
                // console.dir(response, { depth: null });
            }
            const response = yield Promise.all(requests);
            // console.log(`Response: ${response.status} ${response.statusText}`);
            // for (const res of response) {
            //   console.log(`Status: ${res.status} | `, res.data.weight);
            // }
        }
        catch (error) {
            console.error(error);
        }
    });
}
// I have no idea what information I want to retrieve from the pokemon endpoint.
// Maybe we can build an array of objects with each pokemon's:
// name,
// stats,
// types
//
getPokemonByEra("1");
// getPokemon("pikachu");
// getPokemon("vaporeon");
//# sourceMappingURL=axios-poc.js.map