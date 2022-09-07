import jobService from '../../service/jobService';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import FormBtn from './FormBtn';
import InputField from './InputField';
import COLORS from '../../styles/styled.constants';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;

  .form--box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000 !important;
    background-color: #ebebeb;
    text-align: center;
    border-radius: 5px;
    width: 40%;

    @media (max-width: 1006px) {
      width: auto;
    }

    .headerWrapper {
      width: 100%;
      padding-bottom: 1rem;
      .header {
        padding-top: 1rem;
        color: ${COLORS.text};
      }
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormComp = ({
  jobs,
  setJobs,
  role,
}: {
  jobs: Job[];
  setJobs: FunctionType<Job[]>;
  role: string;
}) => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const selectedJob = jobs && jobs.find((job) => job._id === jobId);

  const [formState, setFormState] = useState<formStateType>(
    jobId
      ? {
        company: selectedJob!.company,
        position: selectedJob!.position,
        status: selectedJob!.status,
        date_applied: selectedJob!.date_applied,
        date_interview: selectedJob!.date_interview,
      }
      : {
        company: '',
        position: '',
        status: '',
        date_applied: '',
        date_interview: '',
      }
  );

  const [blurState, setBlurState] = useState<blurStateType>({
    company: false,
    position: false,
    status: false,
    date_applied: false,
    date_interview: false,
  });

  const userId: string = localStorage.getItem('uid')!;

  const changeHandler = (e: React.FormEvent<HTMLElement>) => {
    const target = e.target as typeof e.target & {
      name: string;
      value: string;
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
      };
      await jobService.updateJob(newJob);
      setJobs([...jobs.filter((job) => job._id !== jobId), newJob]);
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
    }
    return '';
  };
  return (
    <Form>
      <form onSubmit={submitHandler} className="form--box">
        <div className="headerWrapper">
          {role === 'add' ? (
            <h1 className="header">Add a New Job</h1>
          ) : (
            <h1 className="header">Edit job</h1>
          )}
        </div>
        <InputField
          identifier="company"
          changeHandler={changeHandler}
          blurHandler={blurHandler}
          isFieldInvalid={isFieldInvalid}
          defaultValue={formState.company}
        />
        <InputField
          identifier="position"
          changeHandler={changeHandler}
          blurHandler={blurHandler}
          isFieldInvalid={isFieldInvalid}
          defaultValue={formState.position}
        />
        <InputField
          identifier="status"
          changeHandler={changeHandler}
          blurHandler={blurHandler}
          isFieldInvalid={isFieldInvalid}
          defaultValue={formState.status}
        />
        <InputField
          identifier="date_applied"
          changeHandler={changeHandler}
          blurHandler={blurHandler}
          isFieldInvalid={isFieldInvalid}
          defaultValue={formState.date_applied}
        />
        <InputField
          identifier="date_interview"
          changeHandler={changeHandler}
          blurHandler={blurHandler}
          isFieldInvalid={isFieldInvalid}
          defaultValue={formState.date_interview}
        />
        <ButtonsContainer>
          <FormBtn
            useCase="Add"
            className="add--btn"
            isFormInvalid={isFormInvalid}
          />
          <Link to={'/list'}>
            <FormBtn useCase="Cancel" className="cancel--btn" />
          </Link>
        </ButtonsContainer>
      </form>
    </Form>
  );
};

export default FormComp;
