import React, { useState, useEffect } from "react"
import dayjs from "dayjs"
import convertTime from "../helpers/convertTime"
import Countdown from "react-countdown-now"
const RecurringSlide = ({
  //   type,
  title,
  price,
  description,
  image,
  eventDays,
  //   textPositioning,
  //   isTypeCard,
}) => {
  const daysOccuring = eventDays ? Object.keys(eventDays) : null
  const [isToday, setIsToday] = useState(false)
  const [eventType, setEventType] = useState(
    eventDays ? "recurring" : "regular"
  )

  console.log("eventDays: ", eventDays)

  const checkIfEventIsOnCurrentDay = () => {
    const currentDay = dayjs()
      .format("dddd")
      .toLocaleLowerCase()
    daysOccuring.forEach(day => {
      if (currentDay === day) {
        setIsToday(true)
      }
    })
  }

  useEffect(() => {
    return eventType === "recurring" ? checkIfEventIsOnCurrentDay() : ""
  }, [])

  const renderEventDays = () => {
    const currentDay = dayjs()
      .format("dddd")
      .toLocaleLowerCase()

    if (eventType === "recurring") {
      return daysOccuring.map((day, idx) => {
        return (
          <span
            key={`${day}-${idx}`}
            className={`evt-day ${currentDay === day ? "is-today" : ""}`}
          >
            {day.toUpperCase()}
          </span>
        )
      })
    }
  }

  const renderHappeningNowView = () => (
    <div className={`countdown-wrapper`}>
      <p>Happening every: {renderEventDays()}</p>
      <h1 className="event-title">{title}</h1>

      <h2>
        Happening today at
        <span className="evt-hour">
          {convertTime(eventDays[daysOccuring[0]].start)}
        </span>
        to
        <span className="evt-hour">
          {convertTime(eventDays[daysOccuring[0]].end)}
        </span>
      </h2>
    </div>
  )

  const renderUpcomingView = () => (
    <div className={`countdown-wrapper`}>
      <h3>Come in on...</h3>
      <p>Happening every: {renderEventDays()}</p>
      <h3>For</h3>
      <h1 className="event-title">{title}</h1>
      <h2>
        Happening at
        <span className="evt-hour">
          {convertTime(eventDays[daysOccuring[0]].start)}
        </span>
        to
        <span className="evt-hour">
          {convertTime(eventDays[daysOccuring[0]].end)}
        </span>
      </h2>
    </div>
  )

  const renderEvent = () => {
    if (isToday) {
      return renderHappeningNowView()
    } else {
      return renderUpcomingView()
    }
  }

  return <React.Fragment>{renderEvent()}</React.Fragment>
}

export default RecurringSlide
