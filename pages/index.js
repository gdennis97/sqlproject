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
import Admin from "pages/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../styles/index.module.css";



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
  let validUsers = "A";
  let validPassword = "A";

  function handleClick() {
    if (name === "" || password === "") {
      alert("There is no username or no password");
    } else if (name === validUsers && validPassword) {
      setLoggedIn(true);
    } else {
      alert("Your username or password is incorrect");
    }
  }

  function handleName(e) {
    console.log(e)
    setName(e.target.value);
    console.log(name);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    // console.log(password)
  }

  function handleLogOut(e) {
    setLoggedIn(false);
    setName("");
    setPassword("");
  }

const campus = [{
  campuses: "RP A-Wing"
}]

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: ""});
  const [allEvents, setAllEvents] = useState(events);

  // const [newCampus, setNewCampus] = useState(campuses);
  // const [allCampus, setAllCampus] = useState(campus)

  function handleAddEvent() {
    alert("Your Cubicle Has Been Booked, an email will be sent");
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

  const updatedCampus = async () => await prisma.Prof.update({
    where: { email: "gdennis@icstars.org" },
      data: {
        profile: {
          update: {
            Campus: value
        },
      },
    },
  });



  if (loggedIn === false) {
    return (
      <div className={styles.login}>
        {/* <h1 className='HelloKitty'>.</h1> */}
        <input
          className={styles.username}
          placeholder="Enter Your Username"
          onChange={handleName}
        />
        <br />
        <input
          className={styles.password}
          placeholder="Enter Your Password"
          onChange={handlePassword}
          type="password"
          pattern="[0-9]"
          inputMode="numeric"
        />
        <br />
        <button className={styles.a} onClick={handleClick}>
          LOGIN
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <button className={styles.logout} onClick={handleLogOut}>
            LOGOUT
          </button>
          <div className={styles.logo}></div>
          <div className={styles.pickdate}>Select a date</div>
          <div style={{ textAlign: "center" }}>
          <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <DatePicker
              placeholderText="Click here to select"
                  popperPlacement="top-start"
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
                  isClearable 
                  style={{ marginLeft: 335}}
                  withPortal
            />
            <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} isClearable withPortal/>
            <Calendar className={styles.calendar}
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 300, width: 600, marginLeft: 375, marginTop: 15 }}
            />

            <div>
              <Dropdown
                className={styles.dropdown}
                placeholder="Click here to select your Campus"
                options={["RP A-Wing", "RP B-Wing", "Waukesha"]}
                value="one"
                onChange={updatedCampus}
                onSelect={(value) => console.log("selected!", value)} // always fires once a selection happens even if there is no change
                onClose={(closedBySelection) =>
                  console.log("closedBySelection?:", closedBySelection)
                }
                onOpen={() => console.log("open!")}
              />
              <div className={styles.img}></div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Dropdown
                className={styles.dropdown}
                placeholder="Click & scroll to choose your time slot"
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
            <div style={{ textAlign: "center" }}>
              <Dropdown
                className={styles.dropdown}
                placeholder="Click & scroll to choose your cubicle number"
                options={["1", "12", "20", "21", "27"]}
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
            <button className={styles.Book} onClick={handleAddEvent}> Book </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
