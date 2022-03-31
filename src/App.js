import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./component/Navbar";
import UTextEditor from "./component/UTextEditor";


function App() {

    return (
        <div className="App">
            <Navbar/>
            <UTextEditor/>

        </div>
    );
}

export default App;
