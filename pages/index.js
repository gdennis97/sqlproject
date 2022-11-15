// import Register from './Register';
// import Login from './Login';

import React, { useState } from "react";
import { Dropdown, Selection } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import admin from "pages/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

function App() {
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [loggedIn, setLoggedIn] = useState(false);
  // let [validUsers, setValidUsers] = useState([{}]);
  let validUsers = "Wendy";
  let validPassword = "Xiong";

  function handleClick() {
    if (name === "" || password === "") {
      alert("There is no username or no password");
    } else if (name === validUsers && validPassword) {
      setLoggedIn(true);
    } else {
      alert("Your username or password is incorrect");
    }
    // setLoggedIn(true);
    // alert(`My name is ${name} and my password is ${password}, ${loggedIn}`);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleLogOut(e) {
    setLoggedIn(false);
    setName("");
    setPassword("");
  }

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      /*
        console.log(d1 <= d2);
        console.log(d2 <= d3);
        console.log(d1 <= d4);
        console.log(d4 <= d3);
            */

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }

  const HandleAlert = () => {
    alert("Your cubicle has been booked");
  };

  if (loggedIn === false) {
    return (
      <div className="App">
        {/* <h1 className='HelloKitty'>.</h1> */}
        <input
          className="username"
          placeholder="Enter Your Username"
          onChange={handleName}
        />
        <br />
        <input
          placeholder="Enter Your Password"
          onChange={handlePassword}
          type="password"
          pattern="[0-9]"
          inputMode="numeric"
        />
        <br />
        <button className="LoginButton" onClick={handleClick}>
          LOGIN
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <button className="LoggedOutButton" onClick={handleLogOut}>
            LOGOUT
          </button>
          <div className="App">
            <Calendar
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, margin: "50px" }}
            />
            <div style={{ textAlign: "center" }}>
              {/* <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} /> */}
              <DatePicker
                placeholderText="Date"
                style={{ marginRight: "10px" }}
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
                onSelect={console.log("some")}
              />
              {/* <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} /> */}
              {/* <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}> Add Event </button>  */}
            </div>
          </div>
          <div>
            {/* <Dropdown
            placeholder="Date"
            options={['one', 'two', 'three']}
            value="one"
            onChange={(value) => console.log('change!', value)}
            onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
            onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
            onOpen={() => console.log('open!')}
        /> */}
            {/* <div>
                <image href="https://i.ibb.co/LJMjcfD/Waukesha.jpg"/>
            </div> */}
            <div>
              <Dropdown
                placeholder="Campus"
                options={["RP A-Wing", "RP B-Wing", "Waukesha"]}
                value="one"
                onChange={(value) => console.log("change!", value)}
                onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
                onClose={(closedBySelection) =>
                  console.log("closedBySelection?:", closedBySelection)
                }
                onOpen={() => console.log("open!")}
              />
            </div>
            <div>
              <Dropdown
                placeholder="Time"
                options={["AM", "PM", "BOTH"]}
                value="one"
                onChange={(value) => console.log("change!", value)}
                onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
                onClose={(closedBySelection) =>
                  console.log("closedBySelection?:", closedBySelection)
                }
                onOpen={() => console.log("open!")}
              />
            </div>
            <div>
              <Dropdown
                placeholder="Cubicle"
                options={["1", "7", "12", "13", "20", "21"]}
                value="one"
                onChange={(value) => console.log("change!", value)}
                onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
                onClose={(closedBySelection) =>
                  console.log("closedBySelection?:", closedBySelection)
                }
                onOpen={() => console.log("open!")}
              />
            </div>
            <div>
              <button style={{ textAlign: "center" }} onClick={HandleAlert}>
                {" "}
                Book{" "}
              </button>
            </div>
            {/* // use the Selection component with other components like popovers etc.
<Selection
  options={['one', 'two', 'three']}
  value="one"
  onChange={(value) => console.log('change!', value)}
/>; */}

            {/* <Router>
        <Routes>
            <Route path='/' element={<admin/>}></Route>
            <Route path='/MapOne' element={<MapOne/>}></Route>
            <Route path='/MapTwo' element={<MapTwo/>}></Route>
            <Route path='/MapThree' element={<MapThree/>}></Route> 
        </Routes>
    </Router>   */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
