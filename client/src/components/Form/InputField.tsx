import React from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/styled.constants';
import dayjs from 'dayjs';

const FormField = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 75%;
  input,
  select {
    border-radius: 3px;
    padding: 1rem;
    margin-bottom: 1.1rem;
    border: 1px solid ${COLORS.title};
    width: 100%;
  }
  input:focus {
    outline: none;
  }
  option {
    font-size: 1.2rem;
    color: ${COLORS.text};
  }
  .company,
  .position,
  .status,
  .applied,
  .interview {
    font-size: 1.1em;
    color: ${COLORS.text};
  }
  label {
    align-self: baseline;
  }
`;
type filedNameType =
  | 'company'
  | 'position'
  | 'status'
  | 'date_applied'
  | 'date_interview';
type Props = {
  identifier: string;
  changeHandler: (e: React.FormEvent<HTMLElement>) => void;
  blurHandler: (e: React.FocusEvent<HTMLElement>) => void;
  isFieldInvalid: (fieldName: filedNameType) => true | '';
  defaultValue?: string;
};

const InputField = ({
  identifier,
  defaultValue,
  changeHandler,
  blurHandler,
  isFieldInvalid,
}: Props) => {
  if (identifier === 'company')
    return (
      <FormField>
        <label htmlFor="company">Company name:</label>
        <input
          defaultValue={defaultValue}
          data-testid="idTest"
          className="input--filed"
          type="text"
          name="company"
          id="company"
          placeholder="Type a company"
          onChange={changeHandler}
          onBlur={blurHandler}
          aria-describedby={
            isFieldInvalid('company') ? 'company-error' : undefined
          }
        />
        {isFieldInvalid('company') ? (
          <p data-testid={'company-error'}>Please provide company name</p>
        ) : null}
      </FormField>
    );
  if (identifier === 'position')
    return (
      <FormField>
        <label htmlFor="position">Position:</label>
        <select
          defaultValue={defaultValue}
          data-testid="position"
          className="position"
          name="position"
          onChange={changeHandler}
          onBlur={blurHandler}
          aria-describedby={
            isFieldInvalid('position') ? 'position-error' : undefined
          }
        >
          <option hidden>Select Job Title</option>
          <option value="frontend">frontend</option>
          <option value="backend">backend</option>
          <option value="fullstack">fullstack</option>
        </select>
        {isFieldInvalid('position') ? (
          <p data-testid={'position-error'}>Please select position</p>
        ) : null}
      </FormField>
    );
  if (identifier === 'status')
    return (
      <FormField>
        <label htmlFor="status">Select job status:</label>
        <select
          defaultValue={defaultValue}
          data-testid="status"
          name="status"
          className="status"
          onChange={changeHandler}
          onBlur={blurHandler}
          aria-describedby={
            isFieldInvalid('status') ? 'status-error' : undefined
          }
        >
          <option hidden>Select Job Status</option>
          <option value="interested">interested</option>
          <option value="applied">applied</option>
          <option value="phone-interview">phone-interview</option>
          <option value="technical interview">technical interview</option>
          <option value="declined">declined</option>
          <option value="accepted">accepted</option>
        </select>
        {isFieldInvalid('status') ? (
          <p data-testid={'status-error'}>
            Please select date of the application
          </p>
        ) : null}
      </FormField>
    );
  if (identifier === 'date_applied')
    return (
      <FormField>
        <label htmlFor="date_applied">Select date of application</label>
        <input
          defaultValue={dayjs(defaultValue).format('YYYY-MM-DD')}
          data-testid="date_applied"
          className="applied"
          name="date_applied"
          type="date"
          onChange={changeHandler}
          onBlur={blurHandler}
          aria-describedby={
            isFieldInvalid('date_applied') ? 'date_applied-error' : undefined
          }
        />
        {isFieldInvalid('date_applied') ? (
          <p data-testid={'date_applied-error'}>Please select interview date</p>
        ) : null}
      </FormField>
    );
  if (identifier === 'date_interview')
    return (
      <FormField>
        <label htmlFor="date_interview">Select date of the interview</label>
        <input
          defaultValue={dayjs(defaultValue).format('YYYY-MM-DDTH:m')}
          data-testid="date_interview"
          className="interview"
          name="date_interview"
          type="datetime-local"
          onChange={changeHandler}
          onBlur={blurHandler}
          aria-describedby={
            isFieldInvalid('date_interview')
              ? '"date_interview-error'
              : undefined
          }
        />
        {isFieldInvalid('date_interview') ? (
          <p data-testid={'date_interview-error'}>Please select position</p>
        ) : null}
      </FormField>
    );
  return <div>error</div>;
};

export default InputField;
