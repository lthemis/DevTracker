import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/styled.constants';

const ButtonEl = styled.div`
  .add--btn,
  .cancel--btn {
    width: 130px;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-bottom: 1rem;
  }
  button:disabled {
    background-color: grey;
  }
  .cancel--btn {
    background-color: white;
    color: ${COLORS.button};
    border: 1px solid ${COLORS.button};
  }
`;

type Props = {
  useCase: string;
  className: string;
  isFormInvalid?: () => boolean;
}

const Button = ({ useCase, className, isFormInvalid }: Props) => {
  return (
    <ButtonEl>
      {useCase === 'Cancel' ?
        <button className={className}>{useCase}</button>
        :
        <button className={className} disabled={isFormInvalid!()}>{useCase}</button>
      }
    </ButtonEl>
  )
}

export default Button;