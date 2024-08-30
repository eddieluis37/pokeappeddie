import React from "react";
import { Button, Card, Row, Col, Pagination } from "react-bootstrap";

const PokemonList = ({
  pokemons,
  onPokemonClick,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <>
      <Row>
        {pokemons.map((pokemon) => (
          <Col key={pokemon.name} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card onClick={() => onPokemonClick(pokemon.url)}>
              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                <Button variant="primary">Ver detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>
        <Pagination.Prev
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        />
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number}
            active={number + 1 === currentPage}
            onClick={() => setCurrentPage(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        />
      </Pagination>
    </>
  );
};

export default PokemonList;
