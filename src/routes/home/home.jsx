import { useState, useEffect } from 'react';
import SignUp from '../../components/sign-up/sign-up';
import axios from 'axios';
import { BASE_URL } from '../../utils/settings';

const Home = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({ username: 'default' });

  useEffect(() => {
    fetch('http://localhost:8000/classes/users/')
      .then((response) => response.json())
      .then((data) => setData(data[0]))
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <div>
      <h1>Welcome {(user && user.display_name) || 'default'}</h1>
      <SignUp />
    </div>
  );
};

export default Home;
