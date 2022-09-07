import React, { useState, useEffect, useCallback } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import styled from 'styled-components';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import COLORS from '../../styles/styled.constants';
import OverviewChart from './OverviewChart';

const DashboardWrapper = styled.div`
display: flex;
  margin-top: 2rem; 
  flex-direction: row;
  flex-wrap: wrap;  
  align-items: center;
  justify-content: center; 
  min-width: 300px; 
  height: 100%;
`;

const DashboardContainer = styled.div`
  .dashboard--icon{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;  
  }
`;

const Graph = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .chart--img {
  }

  .chart {
    opacity: 0;
    transition: all ease-in-out 250ms;
  }

  .chart.active {
    opacity: 1;
    transition: all ease-in-out 250ms;
  }
`;

const DashboardCard = styled.div`
  justify-content: center;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem; 
  
  .chart-navigation{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: #ebebeb;
    border-radius: 3px; 
    min-width: 20rem;
    margin: 1rem;  
  }

  .chart-navigation-details{
    display: flex;
    flex-direction: row; 
    flex-grow: 1; 
  }

  h3,
  h4 {
    text-align: center;
    font-size: 1rem; 
  }
  .btn--icon {
    font-weight: 800;
  }
  .applied,
  .phone,
  .technical,
  .results {
    padding-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    box-shadow: 6px -1px 20px 0px rgba(0, 0, 0, 0.45);
    border-radius: 20px;
    overflow: hidden;
    margin: 0.7rem;
    padding-left: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 20vh;
  }
  .results {
    background-color: ${COLORS.button};
    color: white;
    .filter--num {
      color: ${COLORS.background};
    }
    div {
      padding: 0;
    }
    .btn--icon {
      color: white;
      font-size: 1rem;
      font-weight: 600;
    }
  }
  .filter--num {
    flex: 0.5; 
    text-align: center;
    font-weight: 200;
    color: ${COLORS.button};
    font-size: 2rem;
    max-width: 5rem;
    min-width: 5rem;
  }
  h3 {
    font-size: 1.5rem;
    margin:0px; 
  }
  h5{
    font-size: 0.7rem;
    margin-top:0px;
  }
`;

const Dashboard = ({ jobs }: { jobs: Job[] }) => {

  const filteredStatus = (str: string) => {
    return jobs ? [...jobs].filter(job => job.status === str).length : null;
  }

  const [JobStatus, setJobStatus] = useState<string[]>([])
  const [filteredJobsData, setFilteredJobsData] = useState<number[]>([])

  const filterJobsData = useCallback((filterType: string) => {
    // get an array of job properties relevant for a given filter, e.g. it's application status, company name or position applied
    const filteredJobProperties = jobs.map((job) => {
      return job[filterType as keyof Job];
    }).sort()
    let uniqueJobProperties = [...new Set(filteredJobProperties)] as string[]
    const counts: Counts = {};
    // populate counts object with property(filter type)-value(count of occurrences) pairs, e.g. {applied: 1, phone-interview: 1, technical interview: 2}
    filteredJobProperties.forEach((filterType = 'status') => {
      return counts[filterType as keyof Counts] = (counts[filterType as keyof Counts] || 0) + 1;
    });
    const countedOccurrences = Object.keys(counts).map((key) => { return counts[key as keyof Counts] }) as number[];
    // get an array of values to be passed to the OverviewChart component. 
    setFilteredJobsData(countedOccurrences);
    // get an array of keys to be passed to the OverviewChart component. 
    setJobStatus(uniqueJobProperties)
  }, [jobs]);

  const filterTypes = ['status', 'position', 'company'];

  useEffect(() => {
    filterJobsData('status')
  }, [jobs, filterJobsData]);

  return (
    <DashboardWrapper>
      <Graph>
        <OverviewChart
          jobData={filteredJobsData && filteredJobsData}
          allJobStatus={JobStatus && JobStatus}
        />
      </Graph>
      <DashboardContainer>
        <div className="buttons-container">
          <DashboardCard>
            {filterTypes.map((type, i) => (
              <div key={i} className='chart-navigation'>
                <div className='chart-navigation-icon'>
                  <button onClick={() => filterJobsData(type)}><BiIcons.BiLeftArrowCircle /></button>
                </div>
                <div className='chart-navigation-details'>
                  <div className='filter--num'><BsIcons.BsFillFileCodeFill /></div>
                  <div className='dashboard--icon'><h3>{type.split('')[0].toUpperCase() + type.substring(1)}</h3></div>
                </div>
              </div>
            ))}

            <div className='chart-navigation'>
              <div className='filter--num'>
                <div>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </div>
                <h3>{filteredStatus('declined')}</h3>
                <h5>Declined</h5>
              </div>

              <div className='filter--num'>
                <div>
                  <FontAwesomeIcon icon={faCircleCheck} />{' '}
                </div>
                <h3>{filteredStatus('accepted')}</h3>
                <h5>Accepted</h5>
              </div>
            </div>
          </DashboardCard>
        </div>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;
