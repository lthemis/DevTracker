import jobService from '../../service/jobService';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import COLORS from '../../styles/styled.constants';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Job } from '../../interfaces';
import Button from './Button';
import InputField from './InputField';
const Form = styled.div`
  margin-top: 4rem;
  height: 70vh;
  background-color: #ebebeb;
  border-radius: 3px;
  padding-top: 2.4rem;
  text-align: center;
  margin: 0 auto;
  height: 90vh;
  position: relative;
  width: 100%;
  width: 70%;
  max-width: 50%;
  .form--box {
    z-index: 1000 !important;
  }
`;

const ButtonsContainer = styled.div`
display: flex;
flex-direction: row; 
`;

type formStateType = {
  [key: string]: string
}
type filedNameType = 'company' | 'position' | 'status' | 'date_applied' | 'date_interview';

type blurStateType = {
  [key: string]: boolean | string;
}

const FormComp = ({ jobs, setJobs }: { jobs: Job[], setJobs: any }) => {
  let navigate = useNavigate();
  const [formState, setFormState] = useState<formStateType>({
    company: '',
    position: '',
    status: '',
    date_applied: '',
    date_interview: '',
  });

  const [blurState, setBlurState] = useState<blurStateType>({
    company: false,
    position: false,
    status: false,
    date_applied: false,
    date_interview: false,
  });

  const userId: string = localStorage.getItem('uid')!

  const changeHandler = (e: React.FormEvent<HTMLElement>) => {
    const target = e.target as typeof e.target & {
      name: string,
      value: string
    };
    setFormState({ ...formState, [target.name]: target.value });
  };

  const isFormInvalid = () => {
    if (
      formState.company.length >= 1 &&
      formState.position.length >= 1 &&
      formState.status.length >= 1 &&
      formState.date_applied &&
      formState.date_interview
    ) {
      return false;
    }
    return true;
  };


  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { company, position, status, date_applied, date_interview } =
      e.target as typeof e.target & {
        company: { value: string },
        position: { value: string },
        status: { value: string },
        date_applied: { value: string },
        date_interview: { value: string },
      };

    const newJob = await jobService.createJob({
      uid: userId,
      company: company.value,
      position: position.value,
      status: status.value,
      date_applied: date_applied.value,
      date_interview: date_interview.value,
    });

    setJobs([newJob, ...jobs]);
    navigate('/list');
  };

  const blurHandler = (e: React.FocusEvent<HTMLElement>) => {
    const target = e.target as typeof e.target & { name: string };
    setBlurState({ ...blurState, [target.name]: true });
  };

  const isFieldInvalid = (fieldName: filedNameType) => {
    if (blurState[fieldName] === true && formState[fieldName] === '') {
      return true;
    } return "";
  };

  return (
    <Form>
      <h1>Add a New Job</h1>
      <form onSubmit={submitHandler} className='form--box'>
        <InputField identifier='company' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} />
        <InputField identifier='position' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} />
        <InputField identifier='status' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} />
        <InputField identifier='date_applied' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} />
        <InputField identifier='date_interview' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} />
        <ButtonsContainer>
          <Button useCase="Add" className='add--btn' isFormInvalid={isFormInvalid} />
          <Link to={'/list'}>
            <Button useCase="Cancel" className='cancel--btn' />
          </Link>
        </ButtonsContainer>
      </form>
    </Form>
  );
};

export default FormComp;
