import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Importing comopnents
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'

const App = () => {
    return (
    <Router>
    <div className="App">
        <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/register" exact element={<Register/>}/>
        </Routes>
    </div>
    </Router>
    );
}

export default App;
