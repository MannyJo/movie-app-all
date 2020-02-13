import React, { useState, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Detail from '../Detail/Detail';
import Login from '../Login/Login';
import Watchlist from '../Watchlist/Watchlist';
import { titleReducer as reducer } from '../../reducers/reducer';

import '../../styles/style.scss';

function App() {
  const DEFAULT_PAGE = 1;
  const initTitle = { title: '' };
  const [title, setTitle] = useState(initTitle.title);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [state, dispatch] = useReducer(reducer, initTitle);
  const [token, setToken] = useState(window.sessionStorage.getItem('token'));

  return (
    <div>
      <Router>
        <Header 
          title={title} 
          setTitle={setTitle} 
          dispatch={dispatch} 
          setPage={setPage} 
          token={token}
          setToken={setToken}
          DEFAULT_PAGE={DEFAULT_PAGE} 
        />
        <Switch>
          <Route exact path="/">
            <Main 
              searchText={state.title} 
              setTitle={setTitle} 
              dispatch={dispatch} 
              page={page} 
              setPage={setPage} 
              DEFAULT_PAGE={DEFAULT_PAGE} 
            />
          </Route>
          <Route path="/detail/:id">
            <Detail
              token={token}
              setToken={setToken}
            />
          </Route>
          <Route path="/auth" component={Login} />
          <Route path="/watchlist">
            <Watchlist />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
