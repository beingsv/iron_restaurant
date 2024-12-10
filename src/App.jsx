import RoutesDefined from "./RoutesDefined";
import { Provider } from "react-redux";
import store from "./Utils/store";

function App() {
  return (
    <Provider store={store}>
      <>
        <RoutesDefined />
      </>
    </Provider>
  );
}

export default App;
