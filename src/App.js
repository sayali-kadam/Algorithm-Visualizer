import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AlgoList from './AlgoList/AlgoList';
import SortingAlgo from './SortingAlgo/SortingAlgo';
import SearchingAlgo from './SearchingAlgo/SearchingAlgo';

function App() {
  return (
    <div className="App">
      <h1 className="header"> TechVisualizer </h1>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={AlgoList} exact />
          <Route path='/Sorting' component={SortingAlgo} exact />
          <Route path='/Searching' component={SearchingAlgo} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
