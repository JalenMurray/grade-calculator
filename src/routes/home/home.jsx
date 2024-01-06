import { useState, useEffect } from 'react';
import SignUp from '../../components/sign-up/sign-up';

const Home = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({ username: 'default' });

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => setData(data.users))
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data[Math.floor(Math.random() * 30)]);
    }
  }, [data]);

  return (
    <div>
      <h1>Welcome {(user && user.username) || 'default'}</h1>
      <SignUp />
    </div>
  );
};

export default Home;
