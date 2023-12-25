// pokemonSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPokemons } from './api';

const initialState = () => ({
  pokemon: [],
  loading: false,
  error: null,
});

export const fetchPokemonsAsync = createAsyncThunk(
  'pokemon/fetchPokemons',
  async () => {
    return fetchPokemons();
  }
);

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: initialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonsAsync.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchPokemonsAsync.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        pokemon: action.payload,
      }))
      .addCase(fetchPokemonsAsync.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }))
  },  
});

export default pokemonSlice;