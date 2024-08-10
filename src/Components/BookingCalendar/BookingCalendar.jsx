import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingCalendar.css';
import TimeSelection from '../TimeSelection/TimeSelection';

const BookingCalendar = () => {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [monthName, setMonthName] = useState('');
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-based index)
  const [currentYear, setCurrentYear] = useState(2024);
  const navigate = useNavigate(); // Hook for navigation

  const holidays = [
    '2024-01-01', // New Year's Day
    '2024-01-26', // Republic Day
    '2024-03-08', // Maha Shivaratri
    '2024-03-25', // Holi
    '2024-03-29', // Good Friday
    '2024-04-14', // Dr. Babasaheb Ambedkar Jayanti
    '2024-04-19', // Mahavir Jayanti
    '2024-05-01', // May Day
    '2024-08-15', // Independence Day
    '2024-08-22', // Raksha Bandhan
    '2024-08-24', // Janmashtami
    '2024-10-02', // Gandhi Jayanti
    '2024-10-12', // Dussehra
    '2024-11-01', // Karnataka Rajyotsava
    '2024-11-11', // Diwali
    '2024-12-25', // Christmas
    // Add other holidays here
  ];

  useEffect(() => {
    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setDays(daysArray);

    // Get the month name
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setMonthName(monthNames[currentMonth]);
  }, [currentMonth, currentYear]);

  const isHolidayOrSunday = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const formattedDate = date.toISOString().split('T')[0];
    const isSunday = date.getDay() === 0;
    return holidays.includes(formattedDate) || isSunday;
  };

  const handleDayClick = (day, isDisabled) => {
    if (!isDisabled) {
      setSelectedDay(day); // Set the selected day if it's not disabled
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendarRows = () => {
    const rows = [];
    let cells = [];

    // Get the day of the week the month starts on
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    let dayOfWeek = firstDayOfWeek;

    // Add empty cells for days of the previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(<td key={`empty-${i}`} className="empty"></td>);
    }

    days.forEach((day, index) => {
      const isDisabled = isHolidayOrSunday(day); // Disable holidays and Sundays
      cells.push(
        <td
          key={day}
          onClick={() => handleDayClick(day, isDisabled)}
          className={isDisabled ? 'disabled' : ''}
        >
          {day}
        </td>
      );

      dayOfWeek++;

      if (dayOfWeek % 7 === 0 || index === days.length - 1) {
        rows.push(<tr key={index}>{cells}</tr>);
        cells = [];
      }
    });

    return rows;
  };

  return (
    <div>
      {selectedDay ? (
        <TimeSelection selectedDate={`${monthName} ${selectedDay}, ${currentYear}`} />
      ) : (
        <div id="calendar">
          <div className="calendar-header">
            <span className="arrow" onClick={handlePreviousMonth}>&#9664;</span> {/* Left Arrow */}
            <h2>{monthName} {currentYear}</h2>
            <span className="arrow" onClick={handleNextMonth}>&#9654;</span> {/* Right Arrow */}
          </div>
          <table>
            <thead>
              <tr>
                <th>SU</th>
                <th>MO</th>
                <th>TU</th>
                <th>WE</th>
                <th>TH</th>
                <th>FR</th>
                <th>SA</th>
              </tr>
            </thead>
            <tbody>{renderCalendarRows()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
