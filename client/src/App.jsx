import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard/dashboard';
import List from './components/List/List';
import Navbar from './components/Navbar/Navbar';
import Reminder from './components/Reminder/Reminder';
import jobService from './service/jobService';
import GlobalStyle from './styles/styled.global';
import Login from './components/Login/Login';
import Landing from './components/Home/Landing';
import FormComp from './components/Form/Form';
import styled from "styled-components";

const AppWrapper = styled.div`
display: flex;
flex-direction: column;
`;

const App = () => {

  const userId = localStorage.getItem('uid'); 

  const [jobs, setJobs] = useState([]);

  const getUid = async () => {
    const uid = await localStorage.getItem('uid');
    return uid;
  };

  const fetchItems = async () => {
    const uid = await getUid();
    const jobsFromDb = await jobService.getAllJobs(uid);

    return jobsFromDb;
  };

  const setStateFunc = async () => {
    const result = await fetchItems();
    setJobs(result);
  };

  useEffect(() => {
    setStateFunc();
}, []);


  return userId ? (
    <>
      <AppWrapper>
        <GlobalStyle />
        <>
          <Router>
            <Navbar />
            <Routes>
              
              <Route exact path='/' element={<Landing />} />
              
              <Route
                exact
                path='/dashboard'
                element={<Dashboard jobs={jobs} />}
              />
              <Route exact path='/login' setJobs={setJobs} element={<Login />} />
              <Route
                exact
                path='/list'
                element={<List jobs={jobs} setJobs={setJobs} />}
              />
              <Route
                exact
                path='/add'
                element={
                  <FormComp
                    setJobs={setJobs}
                    jobs={jobs}
                    role="add"
                  />
                }
              />
              <Route
                exact
                path='/edit/:id'
                element={
                  <FormComp
                    setJobs={setJobs}
                    jobs={jobs}
                    role="edit"
                  />
                }
              />
              <Route
                exact
                path='/reminder'
                element={<Reminder jobs={jobs} />}
              />
            </Routes>
          </Router>
        </>
      </AppWrapper>
    </>
  ) : (
    <>
     <AppWrapper>
        <GlobalStyle />
    <Router>
    <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/dashboard' element={<Navigate to='/'></Navigate>} />
        <Route path='/list' element={<Navigate to='/'></Navigate>} />
        <Route path='/add' element={<Navigate to='/'></Navigate>} />
        <Route path='/edit:id' element={<Navigate to='/'></Navigate>} />
        <Route path='/reminder' element={<Navigate to='/'></Navigate>} />
        <Route path='/*' element={<Navigate to='/'></Navigate>} />
      </Routes>
    </Router>
    </AppWrapper>
    </>
  );
};

export default App;
