import styles from './App.module.scss';
import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import {useState} from "react";

/*
ToDo
 react && redux:
 сделать модальное окно для добавления задачи
 доработать идею с CurrentCell
 добавить onClick на ячейку, чтобы именно оно в slice меняло current cell
 вынести данные в render(), в Calendar, в отдельный компонент
*/

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
