import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Home from './components/Home/Home'
import Search from "./components/Search/Search";
import { getAllSources } from "./api/requests";

function App() {
  const [source, setSource] = useState();

  useEffect(() => {
    getAllSources().then(res => {
      setSource(res)
    });
  }, [])

  return (
    <Router>
        <Header />
        <Switch>
            <Route exact path="/">
                <Home source={source}/>
            </Route>
            <Route path="/search">
              <Search />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
