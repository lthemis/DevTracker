import React from 'react';
import styled from 'styled-components';
import background from '../../img/background--img.jpg';
import logo from '../../assets/DevTrackerLogoComplete.png';

const LandingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #242933;
  padding: 2rem;
  .left {
    flex: 2;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 5em;
      font-weight: 1000;
      text-align: center;
    }
    h3 {
      color: white;
      line-height: 3rem;
      padding-top: 2rem;
      font-weight: 300;
      font-size: 2em;
      max-width: 80%;
      text-align: center;
      margin: 0 auto;
    }
  }
  .right {
    flex: 1;
    display:flex;
    justify-content:center;
    align-items:center;
    img {
      width: 500px;
      height: 500px;
      border-radius: 50%;
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
          style={{ width: '25rem' }}></img>
        <div className='subtitle'>
          <h3>
            Make your move. Have your job applications organized. Let's get
            started!
          </h3>
        </div>
      </div>
      <div className='right'>
        <img src={background} alt='cover-img' />
      </div>
    </LandingWrapper>
  );
};

export default Landing;
