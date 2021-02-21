import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';
import { saveAs } from 'file-saver';

const App = () => {
  var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
  

  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
      <button onClick={() => saveAs(file)} >
        save
      </button>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
