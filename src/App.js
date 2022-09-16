import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';
import Header from './Header';
import Alerts from './Alerts';
import Search from './Search';
import NavBar from './NavBar';
import Login from './Login';
import About from "./About";
import NotFound from './NotFound';


import { Switch, Route } from "react-router-dom";

function App() {
  const [page, setPage] = useState("/izzit-streaming")
  const [email, setEmail]= useState("johnsetlock@gmail.com")

  return (
    <div style={{'background-color': "white"}} className="App">
      <Header />
      <Login email={email} setEmail={setEmail}  />
      <NavBar onChangePage={setPage}/>
      <Switch>
                <Route path="/izzit-streaming/about">
                    <About />
                </Route>
                <Route path="/izzit-streaming/alerts">
                <Alerts email={email} />
                </Route>
                <Route exact path="/izzit-streaming">
                <Search   email={email}  />
                </Route>
                <Route path="*">
                <NotFound />
                </Route>
            </Switch>
   </div>
  );
}

export default App;
