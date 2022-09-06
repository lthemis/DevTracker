import React, { useState, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
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

const Dashboard = ({jobs}) => {
  const filteredStatus = (str) => {
    return jobs ? [...jobs].filter(job => job.status === str).length : null;
  }

  const [JobStatus, setJobStatus] = useState([])
  const [jobData, setJobData] = useState([])

  useEffect(() => {
    filterJobsData('status')
  }, []);

  const filterJobsData = (filterType) => {
    const result = jobs.map((job) => {
      return job[filterType];
    }).sort()

    let unique = [...new Set(result)]
    const counts = {};
    result.forEach((x) => { 
      return counts[x] = (counts[x] || 0) + 1; });

    const array = Object.keys(counts).map(function (key) { return counts[key] });

    setJobData(array);
    setJobStatus(unique)
  };

  return (
    <DashboardWrapper>
      <Graph>
        <OverviewChart
          jobData={jobData}
          allJobStatus={JobStatus}
        />
      </Graph>


      <DashboardContainer>
        <div className="buttons-container">
          <DashboardCard>
            <div className='chart-navigation'>
              <div className='chart-navigation-icon'>
                <button onClick={() => filterJobsData('status')}><BiIcons.BiLeftArrowCircle /></button>

              </div>
              <div className='chart-navigation-details'>
                <div className='filter--num'>{jobs ? jobs.length : null}</div>
                <div className='dashboard--icon' ><h3>Overview</h3></div>
              </div>
            </div>

            <div className='chart-navigation'>
              <div className='chart-navigation-icon'>
                <button onClick={() => filterJobsData('position')}><BiIcons.BiLeftArrowCircle /></button>
              </div >
              <div className='chart-navigation-details'>
                <div className='filter--num'> <BsIcons.BsFillPhoneFill /> </div>
                <div className='dashboard--icon' ><h3>Position</h3></div>
              </div>
            </div>

            <div className='chart-navigation'>
              <div className='chart-navigation-icon'>
                <button onClick={() => filterJobsData('company')}><BiIcons.BiLeftArrowCircle /></button>

              </div>
              <div className='chart-navigation-details'>
                <div className='filter--num'><BsIcons.BsFillFileCodeFill /></div>
                <div className='dashboard--icon'><h3>Companies</h3></div>
              </div>
            </div>

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
