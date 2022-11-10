import styles from './App.module.scss';
import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import {useState} from "react";

/*
ToDo
 react && redux:
 сделать нормальную кнопку (вместо + в <div/>) и модальное окно для добавления задачи
 доработать идею с CurrentCell
 добавить onClick на ячейку, чтобы именно оно в slice меняло current cell
 //
 css:
 добавить нормальный шрифт
 сделать красивее стили
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
