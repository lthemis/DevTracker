import React from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../../firebase';
import styled from 'styled-components';
import COLORS from '../../styles/styled.constants';
import { useNavigate } from 'react-router-dom';

const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  margin: 0.5em;
  padding: 0.5em;
  width: 90%;
  height: 3rem;
  border-radius: 30px;
  background-color: black;
  color: white;
  :hover {
    background-color: ${COLORS.buttonLogin};
    color: white;
    cursor: pointer;
  }
`;
export function Login({
  loggedIn,
  setLoggedIn,
  setJobs,
}: {
  loggedIn?: boolean;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  setJobs?: React.Dispatch<React.SetStateAction<Job[]>>;
}) {
  const navigate = useNavigate();
  const SingInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((res: UserCredential) => {
        localStorage.setItem('uid', res.user.uid);
        res.user.photoURL &&
          localStorage.setItem('userPhoto', res.user.photoURL);
        res.user.email && localStorage.setItem('email', res.user.email);
        setLoggedIn && setLoggedIn(true);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const LogOut = async () => {
    signOut(auth)
      .then(() => {
        setJobs && setJobs([]);
      })
      .then(() => setLoggedIn && setLoggedIn(false))
      .catch((err) => {
        console.log(err);
      });
    localStorage.removeItem('uid');
    localStorage.removeItem('userPhoto');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <div>
      {!loggedIn ? (
        <LoginButton className="login-button" onClick={SingInWithGoogle}>
          Sing In With Google
        </LoginButton>
      ) : (
        <LoginButton className="login-google" onClick={LogOut}>
          Log out
        </LoginButton>
      )}
    </div>
  );
}
