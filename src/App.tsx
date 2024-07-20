import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Navbar} from "./components/Navbar/Navbar";
import routes from "./routes/routes";


function App() {

  return (
      <Router>
        <div>
          <Navbar />
          <Routes>
              {routes.map(route =>
                    <Route path={route.path} element={<route.element />} key={route.path}/>
              )}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
