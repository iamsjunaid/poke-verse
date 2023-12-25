import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonsAsync } from '../redux/pokemon/pokemonSlice';
import pokeball from '../assets/pokeball.png';
import pokelogo from '../assets/pokelogo.png';
import ShowPokemon from './ShowPokemon';
import { Link, useNavigate } from 'react-router-dom';

const PokemonsList = () => {
  const { pokemon, isLoading, error } = useSelector((state) => state.pokemon);
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPokemonsAsync());
  }, [selectedPokemonName]);

  const handleModal = (name) => {
    setModal(true);
    setSelectedPokemonName(name);
    navigate(`/details/${name}`);
  };

  const handleClose = () => {
    setModal(false);
    setSelectedPokemonName(null);
    navigate(-1);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = pokeball;
  };

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='w-32 h-16 mx-auto'>
        <img src={pokelogo} alt='poke verse logo' />
      </div>
      <div className='flex sm:flex-row justify-between flex-col items-center p-4 text-red-600'>
        <input
          className='text border-b-2 border-red-400 rounded-md p-2 w-full sm:w-1/4 focus:outline-none focus:border-red-600'
          type='text'
          placeholder='Search Pokemon...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <p>filter by type</p>
      </div>
      <div className='flex flex-col justify-center items-center w-full mx-auto bg-gray-100 text-white'>
        <ul className='grid grid-cols-1 sm:grid-cols-4 gap-4 w-full sm:w-[100%] p-4 mx-auto'>
          {filteredPokemon.map((p, index) => (
            <div key={p.name}>
              <li
                className='sm:w-[20rem] w-full rounded-xl border-2 bg-red-600 h-[12rem] flex flex-row justify-around items-center hover:shadow-md hover:scale-105 transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer'
                onClick={() => handleModal(p.name)}
              >
                <div className='bg-white rounded-full border-2 w-1/2 h-4/5 flex justify-center'>
                  <img
                    className='w-28 h-28 object-contain object-center'
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
                      index + 1
                    }.svg`}
                    alt='pokemon'
                    onError={handleImageError}
                  />
                </div>
                <div className=''>
                  <h2 className='font-bold text-xl text-center'>{index + 1}</h2>
                  <h2 className='font-bold text-xl'>{p.name}</h2>
                </div>
                <br />
              </li>
            </div>
          ))}
        </ul>
      </div>
      {modal && (
        <Link to={`/details/${selectedPokemonName}`}>
          <ShowPokemon
            handleClose={handleClose}
            selectedPokemonName={selectedPokemonName}
          />
        </Link>
      )}
    </>
  );
};

export default PokemonsList;
