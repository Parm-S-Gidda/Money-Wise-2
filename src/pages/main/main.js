import './styles/main.css';
import Day from './components/day'
import Header from './components/header';
import DayTitle from './components/dayTitle';
import Months from './components/months';

function Main() {
  return (
    <div className="mainDiv">

        <Header />
        <Months/>
        <DayTitle />


        <div className="allDays">
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
        </div>
       

    </div>
  );
}

export default Main;