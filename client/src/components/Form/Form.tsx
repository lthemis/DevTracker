import jobService from '../../service/jobService';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
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
  [key: string]: string;
}

type filedNameType = 'company' | 'position' | 'status' | 'date_applied' | 'date_interview';

type blurStateType = {
  [key: string]: boolean | string;
}

const FormComp = ({ jobs, setJobs, role }: { jobs: Job[], setJobs: any, role: string }) => {
  let navigate = useNavigate();
  const { id: jobId } = useParams();
  const selectedJob = jobs.find(job => job._id === jobId)

  const [formState, setFormState] = useState<formStateType>(
    jobId ? {
      company: selectedJob!.company,
      position: selectedJob!.position,
      status: selectedJob!.status,
      date_applied: selectedJob!.date_applied,
      date_interview: selectedJob!.date_interview,
    } : {
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

    if (jobId) {
      const newJob = {
        _id: jobId,
        company: formState.company,
        position: formState.position,
        status: formState.status,
        date_applied: formState.date_applied,
        date_interview: formState.date_interview,
      }
      await jobService.updateJob(newJob);
      setJobs([...jobs.filter(job => job._id !== jobId), newJob]);
    }

    if (!jobId) {
      const newJob = await jobService.createJob({
        uid: userId,
        company: formState.company,
        position: formState.position,
        status: formState.status,
        date_applied: formState.date_applied,
        date_interview: formState.date_interview,
      });
      setJobs([newJob, ...jobs]);
    }

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
      {role === 'add' ? <h1>Add a New Job</h1> : <h1>Edit job</h1>}
      <form onSubmit={submitHandler} className='form--box'>
        <InputField identifier='company' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} defaultValue={formState.company} />
        <InputField identifier='position' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} defaultValue={formState.position} />
        <InputField identifier='status' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} defaultValue={formState.status} />
        <InputField identifier='date_applied' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} defaultValue={formState.date_applied} />
        <InputField identifier='date_interview' changeHandler={changeHandler} blurHandler={blurHandler} isFieldInvalid={isFieldInvalid} defaultValue={formState.date_interview} />
        <ButtonsContainer>
          <Button useCase="Add" className='add--btn' isFormInvalid={isFormInvalid} />
          <Link to={'/list'}>
            <Button useCase="Cancel" className='cancel--btn' />
          </Link>
        </ButtonsContainer>
      </form>
    </Form>)
};

export default FormComp;
