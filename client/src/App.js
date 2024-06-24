import "./App.css";
import DataProvider from "./GlobalContext";
import Main from "./components/Main";

function App() {
  return (
    <DataProvider>
      <Main />
    </DataProvider>
  );
}

export default App;
