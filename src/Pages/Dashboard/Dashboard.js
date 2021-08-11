import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const Dashboard = () => {
  const { getUserInformation } = useContext(AuthContext);
  return (
    <>
      <h2>Dashboard</h2>
      {getUserInformation().name}
    </>
  );
};

export default Dashboard;
