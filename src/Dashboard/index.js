import React from 'react';
import { useLocalState } from '../utils/useLocalStorage';

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  return (
    <div>
      Dashboard Page jwtToken is {jwt}
    </div>
  );
};

export default Dashboard;