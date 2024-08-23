import './App.css';
import RouterComponent from './components/RouterComponent'
import Navbar from './components/Navbar';
import { UserProvider } from './components/AuthContext'

function App() {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <RouterComponent />
      </UserProvider>
    </div>
  );
}

export default App;
