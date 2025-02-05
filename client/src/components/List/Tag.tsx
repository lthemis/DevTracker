import React from 'react';
import COLORS from '../../styles/styled.constants';
import styled from 'styled-components';

const TagElement = styled.button`
  border: 1px solid ${COLORS.button};
  margin: 0.5em;
  padding: 0.3em;
  width: 180px;
  border: solid 1px white;
  border-radius: 30px;
  background-color: #242933;
  color: white;
  :hover {
    background-color: ${COLORS.button};
    color: white;
  }
`;

export const Tag = ({
  selectedFilter,
  setFilter,
}: {
  selectedFilter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TagElement
      className="tag-btn"
      onClick={() => setFilter(selectedFilter)}
      value={selectedFilter}
    >
      {selectedFilter}
    </TagElement>
  );
};
