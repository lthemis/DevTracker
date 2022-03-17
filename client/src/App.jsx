import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard/dashboard';
import EditForm from './components/EditForm/EditForm';
import Home from './components/Home/Home';
import List from './components/List/List';
import Navbar from './components/Navbar/Navbar';
import Add from './components/NewJob/Add';
import Reminder from './components/Reminder/Reminder';
import jobService from './service/jobService';
import GlobalStyle from './styles/styled.global';
import Login from './components/Login/Login';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [update, triggerUpdate] = useState();

  const getUid = async () => {
    const uid = await localStorage.getItem('uid');
    console.log('GETUid', uid);
    return uid;
  };

  const fetchItems = async () => {
    const uid = await getUid();
    console.log(uid);
    const jobsFromDb = await jobService.getAllJobs(uid);

    return jobsFromDb;
  };

  const setStateFunc = async () => {
    const result = await fetchItems();
    console.log('STEP 5: set state', result);
    setJobs(result);
  };

  useEffect(() => {
    setStateFunc();
  }, [update]);

  return (
    <>
      <div>
        <GlobalStyle />
        <>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route
                exact
                path='/dashboard'
                element={<Dashboard jobs={jobs} />}
              />
              <Route exact path='/login' element={<Login />} />
              <Route
                exact
                path='/list'
                element={<List jobs={jobs} setJobs={setJobs} />}
              />
              <Route
                exact
                path='/add'
                element={
                  <Add
                    setJobs={setJobs}
                    jobs={jobs}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                  />
                }
              />
              <Route
                exact
                path='/edit/:id'
                element={
                  <EditForm
                    triggerUpdate={triggerUpdate}
                    jobs={jobs}
                    setJobs={setJobs}
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
      </div>
    </>
  );
};

export default App;
