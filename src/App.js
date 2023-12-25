import './App.css';
import PokemonsList from './components/PokemonsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowPokemon from "./components/ShowPokemon";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonsList />}>
            <Route index path="/" element={<PokemonsList />} />
            <Route exact path="/details/:name" element={<ShowPokemon />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
