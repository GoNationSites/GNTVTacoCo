import React, { useState, useEffect } from "react"
import dayjs from "dayjs"
import convertTime from "../helpers/convertTime"
import Countdown from "react-countdown-now"
const FullImageBG = ({
  //   type,
  title,
  price,
  description,
  image,
  eventDays,
  //   textPositioning,
  //   isTypeCard,
}) => {
  const daysOccuring = Object.keys(eventDays)
  const [isToday, setIsToday] = useState(false)

  useEffect(() => {
    const currentDay = dayjs()
      .format("dddd")
      .toLocaleLowerCase()
    daysOccuring.forEach(day => {
      if (currentDay === day) {
        setIsToday(true)
      }
    })
  }, [])

  const renderEventDays = () => {
    const currentDay = dayjs()
      .format("dddd")
      .toLocaleLowerCase()

    return daysOccuring.map(day => {
      return (
        <span className={`evt-day ${currentDay === day ? "is-today" : ""}`}>
          {day.toUpperCase()}
        </span>
      )
    })
  }

  const renderHappeningNowView = () => (
    <div className={`countdown-wrapper`}>
      <p>{renderEventDays()}</p>
      <h1>{title}</h1>

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
      <p>{renderEventDays()}</p>
      <h3>For</h3>
      <h1>{title}</h1>
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

export default FullImageBG
