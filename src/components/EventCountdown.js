import React from "react"
import Countdown from "react-countdown-now"
import dayjs from "dayjs"

const EventCountdown = ({ title, description, image, starts, ends }) => {
  const Completionist = () => <p className="happening-title">HAPPENING NOW</p>
  const renderer = ({ hours, minutes, seconds, completed, days }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <p className="countdown-timer">
          <p>
            <span className="time-title">days</span>{" "}
            <span className="time-value">{days}</span>
          </p>
          <p>
            <span className="time-title">hours</span>{" "}
            <span className="time-value">{hours}</span>
          </p>
          <p>
            <span className="time-title">minutes</span>{" "}
            <span className="time-value">{minutes}</span>
          </p>
          <p>
            <span className="time-title">seconds</span>{" "}
            <span className="time-value">{seconds}</span>
          </p>
        </p>
      )
    }
  }
  return (
    <div className="event-countdown-wrap">
      <div>
        <h1 className="event-title">{title}</h1>
        <p>
          <span>Starts: </span>
          {dayjs(starts).format("MMMM D, h:mm A")}
        </p>
        <Countdown daysInHours date={starts} renderer={renderer}></Countdown>
        <p>Ends: {dayjs(ends).format("MMMM D, h:mm A")}</p>
      </div>
    </div>
  )
}

export default EventCountdown
