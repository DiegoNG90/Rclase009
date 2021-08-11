import { useAuth } from '../../contexts/auth';

const Dashboard = () => {
  const { getUserInformation } = useAuth();
  const {name:{name}} = getUserInformation()
  console.log(name)
  return (
    <>
      <h2>Dashboard</h2>
      <h3>Bienvenido {name}</h3>
    </>
  );
};

export default Dashboard;
