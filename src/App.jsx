import axios from "axios";
import "./App.css";

function App() {
  const API = "https://api-pokemon-fr.vercel.app/api/v1/gen/2";

  axios
    .get(API)
    .then((res) => console.log(res.data[0].name.fr))
    .catch((error) => console.error(error));

  return <></>;
}

export default App;
