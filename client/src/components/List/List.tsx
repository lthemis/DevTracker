import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import jobService from '../../service/jobService';
import { Tag } from './Tag';
import { Card } from '../Card/Card';
const ListWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const PositionButton = styled.div`
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1;
  display: flex;
  width: 100%;
  margin-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const CardWrapper = styled.div`
  padding: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .card--section {
    padding-left: 1.2rem;
  }
  .update {
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
    padding-right: 2rem;
    padding-top: 1.4rem;
    font-style: italic;
  }
`;

const List = ({
  jobs,
  setJobs,
}: {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');

  const editHandler = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const deleteHandler = async (id: string) => {
    await jobService
      .deleteJob(id)
      .then(() => setJobs(jobs.filter((job) => job.id !== id)));
    const alteredJobs = jobs.filter((job) => job._id !== id);
    setJobs(alteredJobs);
  };

  const btnValues = [
    'all',
    'frontend',
    'backend',
    'fullstack',
    'applied',
    'phone-interview',
    'technical interview',
    'declined',
    'accepted',
    'interested',
  ];
  return (
    <ListWrapper>
      <PositionButton>
        {btnValues.map((selectedFilter, i) => {
          return (
            <Tag
              selectedFilter={selectedFilter}
              setFilter={setFilter}
              key={i}
            ></Tag>
          );
        })}
      </PositionButton>

      <CardWrapper>
        {jobs &&
          jobs
            .filter((job) => {
              if (filter === 'all') {
                return job;
              }
              return job.position === filter || job.status === filter;
            })
            .map((job, i) => {
              return (
                <Card
                  job={job}
                  editHandler={editHandler}
                  deleteHandler={deleteHandler}
                  key={i}
                ></Card>
              );
            })}
      </CardWrapper>
    </ListWrapper>
  );
};

export default List;
