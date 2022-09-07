import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

const Icon = styled.div`
  font-size: 1.5em;
  /* display: inline-block;
text-align: center;
margin: 0 auto; */
button {
  width: 3rem; 
  height: 3rem;
  border-radius: 50%; 
  border: solid 2px #7d7d7d;
  background-color: transparent;
  color: #7d7d7d;
}
`;

export const CardBtn = ({ handler, icon, job }: { handler: FunctionType<string>, icon: IconDefinition, job: Job }) => {
  return (
    <Icon >
      <button className="edit-job-button" onClick={() => job._id && handler(job._id)} >
        <FontAwesomeIcon icon={icon} />
      </button>
    </Icon>
  );
};
