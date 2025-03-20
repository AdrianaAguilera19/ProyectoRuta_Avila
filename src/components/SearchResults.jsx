import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Estilos para el contenedor de resultados
const ResultadosContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
`;

// Estilos para cada resultado
const Resultado = styled(Link)`
  display: block;
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-decoration: none;
  color: #333;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

// Estilos para el mensaje de "No se encontraron resultados"
const MensajeSinResultados = styled.p`
  padding: 10px;
  text-align: center;
  color: #666;
  margin: 0;
`;

const SearchResults = ({ results, onClose }) => {
  // Si results es null o undefined, lo inicializamos como un array vacío
  const safeResults = results || [];

  return (
    <ResultadosContainer>
      {safeResults.length > 0 ? (
        safeResults.map((result) => (
          <Resultado
            key={result.id}
            to={`/ruta/${result.id}`}
            onClick={onClose} // Cierra el menú de resultados al hacer clic
          >
            {result.nombre}
          </Resultado>
        ))
      ) : (
        <MensajeSinResultados>No se encontraron resultados.</MensajeSinResultados>
      )}
    </ResultadosContainer>
  );
};

export default SearchResults;