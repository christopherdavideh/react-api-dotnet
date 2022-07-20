import React  from 'react';
import './App.css';
import { Routes, Route} from "react-router-dom";
import { Home } from './components/Home';
import { Department } from './components/Department';
import { Employee } from './components/Employee';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="departments" element={<Department />} />
        <Route path="employees" element={<Employee />} />
      </Routes>
      
    </div>
  );
}
export default App;
