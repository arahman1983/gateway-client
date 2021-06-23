import { BrowserRouter} from "react-router-dom";
import { Header } from "./components";
import AppRouts from './routes/routes'
import styles from './app.module.css'

function App() {
  return (
    <>
    <Header />
    <div className="container py-5">
      <div className={styles.card}>
        <BrowserRouter>
          <AppRouts />
        </BrowserRouter>

      </div>
    </div>    
      
    </>
  );
}

export default App;
