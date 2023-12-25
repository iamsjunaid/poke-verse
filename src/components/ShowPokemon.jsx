import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

const ShowPokemon = ({ handleClose, selectedPokemonName }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedPokemonName]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex flex-col sm:flex-row justify-center items-center'>
      <div className='flex rounded-md bg-gray-300 sm:w-1/2 sm:h-1/2 w-4/5 h-2/3 float-right'>
        <div>
          <MdClose
            className='text-2xl absolute sm:top-42 sm:right-[21rem] right-12 top-42 cursor-pointer hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-125'
            onClick={handleClose}
          />
        </div>
        <div className='flex my-8 flex-col sm:flex-row sm:justify-around justify-center items-center w-full gap-8'>
          <div className='bg-gray-600 rounded-full'>
            <img
              className='object-contain object-center w-52 h-52 '
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`}
              alt='pokemon'
            />
          </div>
          <div className='bg-red-600 text-white px-16 flex flex-col items-center rounded-md'>
            <h2 className='text-2xl font-bold mb-2'>{data.name}</h2>
            <p>Weight: {data.weight}</p>
            <h3 className='text-xl font-bold mt-4'>Stats:</h3>
            <ul>
              {data.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPokemon;
