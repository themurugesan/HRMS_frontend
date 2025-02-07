import React, { useEffect, useState } from "react";
import axios from "axios";
import './attence.css';

const Attendance = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState("210009");
  const [weeklyLogs, setWeeklyLogs] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  const [totalLoginHours, setTotalLoginHours] = useState(0);
  const [totalLogoutHours, setTotalLogoutHours] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  // This function calculates total work hours for a given day's logs
  const calculateDailyWorkHours = (logs) => {
    let totalHours = 0;
    for (let i = 0; i < logs.length - 1; i++) {
      if (logs[i].isCheckIn === "1" && logs[i + 1]?.isCheckIn === "0") {
        const loginTime = new Date(logs[i].eventtime);
        const logoutTime = new Date(logs[i + 1].eventtime);
        const diffInMs = logoutTime - loginTime;
        const diffInHours = diffInMs / (1000 * 60 * 60); // converting milliseconds to hours
        totalHours += diffInHours;
      }
    }
    return totalHours.toFixed(2);
  };

  // Get the current week date range (start and end)
  const getCurrentWeekRange = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const endDate = new Date(currentDate.setDate(startDate.getDate() + 6));

    return { startDate, endDate };
  };

  useEffect(() => {
    const { startDate, endDate } = getCurrentWeekRange();
    axios
      .get("http://localhost:5000/api/attendance")
      .then((response) => {
        const data = response.data;

        // Filter logs by employee ID and by the current week range
        const employeeLogs = data.filter((log) => {
          const logDate = new Date(log.eventtime);
          return log.employeeId === employeeId && logDate >= startDate && logDate <= endDate;
        });

        const categorizedLogs = {
          Sunday: [],
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        };

        employeeLogs.forEach((log) => {
          const logDate = new Date(log.eventtime);
          const dayName = logDate.toLocaleString("en-us", { weekday: "long" });
          categorizedLogs[dayName].push(log);
        });

        // Calculate total login and logout hours
        let loginHours = 0;
        let logoutHours = 0;

        employeeLogs.forEach((log, index) => {
          if (log.isCheckIn === "1" && employeeLogs[index + 1]?.isCheckIn === "0") {
            const loginTime = new Date(log.eventtime);
            const logoutTime = new Date(employeeLogs[index + 1].eventtime);
            const diffInMs = logoutTime - loginTime;
            const diffInHours = diffInMs / (1000 * 60 * 60); // converting milliseconds to hours

            loginHours += diffInHours;
            logoutHours += diffInHours;
          }
        });

        setTotalLoginHours(loginHours.toFixed(2));
        setTotalLogoutHours(logoutHours.toFixed(2));

        setWeeklyLogs(categorizedLogs);
        setLogs(employeeLogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
        setLoading(false);
      });
  }, [employeeId, currentDate]);

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  return (
    <div className="App">
      <h1>Employee Log Viewer</h1>

      <div>
        <label htmlFor="employeeId">Employee ID: </label>
        <input
          type="text"
          id="employeeId"
          value={employeeId}
          onChange={handleEmployeeIdChange}
        />
      </div>

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <div className="weekly-logs-container">
          {/* Grid layout for weekly logs */}
          <div className="week-grid">
            {Object.keys(weeklyLogs).map((day) => (
              <div key={day} className="day-column">
                <h3>{day}</h3>
                <p>Total Work Hours: {weeklyLogs[day].length > 0 ? calculateDailyWorkHours(weeklyLogs[day]) : "00.00"} hrs</p>

                {/* Logs for each day */}
                <div className="log-events">
                  {weeklyLogs[day].map((log, index) => (
                    <div key={index} className="log-event-container">
                      <span
                        className="log-event"
                        style={{
                          backgroundColor: log.isCheckIn === "1" ? "green" : "red",
                          marginLeft: "5px",
                          height: "10px",
                          width: "10px",
                          borderRadius: "50%",
                        }}
                      />
                      <div className="log-details">
                        <span className="log-time">
                          {new Date(log.eventtime).toLocaleTimeString()}
                        </span>
                        <span className="log-type">
                          {log.isCheckIn === "1" ? "Check-In" : "Check-Out"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="total-hours">
        <p>Total Login Hours: {totalLoginHours} hrs</p>
        <p>Total Logout Hours: {totalLogoutHours} hrs</p>
      </div>
    </div>
  );
};

export default Attendance;
