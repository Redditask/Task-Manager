import styles from './App.module.scss';
import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import {useState} from "react";

function App() {
    const [dateValue, setDateValue] = useState(()=>new Date());

  return (
    <div className={styles.App}>
      <AsideBar/>
      <Calendar value={dateValue}/>
    </div>
  );
}

export default App;
