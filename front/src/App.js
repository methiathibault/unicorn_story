//import './App.css';
import RouterComponent from './components/RouterComponent'
import Navbar from './components/Navbar';
import { UserProvider } from './components/AuthContext'
import { UnicornProvider } from './components/UnicornContext';

function App() {
  return (
    <div>
      <UserProvider>
        <UnicornProvider>
          <Navbar />
          <RouterComponent />
        </UnicornProvider>
      </UserProvider>
    </div>
  );
}

export default App;
