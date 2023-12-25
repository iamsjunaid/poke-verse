import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemon/pokemonSlice";

const store = configureStore({
  reducer: {
    pokemons: pokemonSlice.reducer,
  },
});

export default store;