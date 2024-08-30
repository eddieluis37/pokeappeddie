import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para la búsqueda

  useEffect(() => {
    fetchPokemons();
  }, [currentPage]);

  const fetchPokemons = async () => {
    try {
      const limit = 20;
      const offset = (currentPage - 1) * limit;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      setPokemons(response.data.results);
      setTotalPages(Math.ceil(response.data.count / limit));
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
    }
  };

  const handlePokemonClick = async (url) => {
    try {
      const response = await axios.get(url);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Form.Group controlId="searchPokemon" className="my-3">
        <Form.Control
          type="text"
          placeholder="Buscar Pokémon por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form.Group>

      {selectedPokemon ? (
        <PokemonDetails pokemon={selectedPokemon} />
      ) : (
        <PokemonList
          pokemons={filteredPokemons}
          onPokemonClick={handlePokemonClick}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </Container>
  );
};

export default App;
