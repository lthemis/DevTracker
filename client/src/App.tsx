import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import List from './components/List/List';
import Navbar from './components/Navbar/Navbar'
import Reminder from './components/Reminder/Reminder';
import jobService from './service/jobService';
import GlobalStyle from './styles/styled.global';
import { Login } from './components/Login/Login';
import Landing from './components/Home/Landing';
import FormComp from './components/Form/Form';
import styled from "styled-components";

const AppWrapper = styled.div`
display: flex;
flex-direction: column;
`;

const App = () => {

  const userId = localStorage.getItem('uid');
  const [jobs, setJobs] = useState<Job[]>([]);

  const getUid = async () => {
    const uid = await localStorage.getItem('uid');
    return uid;
  };

  const fetchItems = async () => {
    const uid = await getUid();
    const jobsFromDb = uid && await jobService.getAllJobs(uid);

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

              <Route path='/' element={<Landing />} />

              <Route
                path='/dashboard'
                element={<Dashboard jobs={jobs} />}
              />
              <Route path='/login' element={<Login setJobs={setJobs} />} />
              <Route
                path='/list'
                element={<List jobs={jobs} setJobs={setJobs} />}
              />
              <Route
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
            <Route path='/' element={<Landing />} />
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
