import React from 'react';
import styled from 'styled-components';
import background from '../../img/background--img.jpg';
import logo from '../../assets/DevTrackerLogoComplete.png';

const LandingWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #242933;
  padding: 2rem;
  flex-grow: 1;
  .left {
    width:50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1006px) { 
      width:auto;
     }
    img {
      width: 25rem;
      @media (max-width: 1060px) { 
        width: 15rem;
      }
    }
    h1 {
      font-size: 5em;
      font-weight: 1000;
      text-align: center;
      @media (max-width: 1060px) { 
        font-size:3em;
       }
    }
    .subtitle {
      width: 100%;
      .subtitle > * {
        color: red;
      }
    }
    h3 {
      color: white;
      line-height: 3rem;
      font-weight: 300;
      font-size: 2em;
      text-align: center;
      @media (max-width: 1060px) { 
        font-size:1.5em;
       }
    }
  }
  .right {
    display:flex;
    justify-content:center;
    align-items:center;
    img {
      width: 35rem;
      height: 35rem;
      border-radius: 50%;
      @media (max-width: 1060px) { 
        width: 20rem;
        height: 20rem;
       }
    }
  }
`;

const Landing = () => {
  return (
    <LandingWrapper>
      <div className='left'>
        <img
          src={logo}
          alt='DevTracker Logo complete'
          ></img>
        <div className='subtitle'>
          <h3>
            Make your move. Have your job applications organized. Let's get
            started!
          </h3>
        </div>
      </div>
    </LandingWrapper>
  );
};

export default Landing;
