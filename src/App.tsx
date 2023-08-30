import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Deadline calculator</h1>
            </header>
            <main className='App-main'>
                <Calculator/>
            </main>
        </div>
    );
}

export default App;
