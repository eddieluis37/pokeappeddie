import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PokemonDetails = ({ pokemon }) => {
  return (
    <Card>
      <Card.Img variant="top" src={pokemon.sprites.front_default} />
      <Card.Body>
        <Card.Title>{pokemon.name}</Card.Title>
        <Card.Text>
          <strong>Habilidades:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
        </Card.Text>
        <Card.Text>
          <strong>Tipos:</strong> {pokemon.types.map((type) => type.type.name).join(', ')}
        </Card.Text>
        <Button variant="primary" onClick={() => window.location.reload()}>Volver a la lista</Button>
      </Card.Body>
    </Card>
  );
};

export default PokemonDetails;
