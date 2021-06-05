import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import './style/styles.scss'
import store from './util/store';

const App = () => {

  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

export default App;
