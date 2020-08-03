import React, { useContext, } from 'react';
import { UserContext } from './Store'
import './App.css';
import Navigation from './Navigation'




function App() {

  const [user, setUser] = useContext(UserContext)

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <Navigation />
      </div>
    </UserContext.Provider>

  );
}

export default App;
