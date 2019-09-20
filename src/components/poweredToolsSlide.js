import React, { useState } from "react"

const PoweredToolsSlide = props => {
  const [currentDuration, setCurrentDuration] = useState(props.duration)
  const [showForm, setShowForm] = useState(false)
  const handleDurationChange = event => {
    setCurrentDuration(event.target.value)
    props.setSlideDuration(event.target.value)
  }

  const handleContentTypeChange = event => {
    console.log(event.target.value)
  }

  return (
    <div
      className={`powered-by-bar ${
        showForm ? "animated slideInUp faster tools-active" : ""
      }`}
    >
      <p className="has-text-centered" onClick={() => setShowForm(!showForm)}>
        TV Powered By GoNation
      </p>
      <div className={`powered-tools-form-wrap ${showForm ? "" : "is-hidden"}`}>
        <form className="powered-tools-form">
          <h1 className="has-text-centered">GoNation TV Powered Settings</h1>
          <div className="control flex-down">
            <h4>Slide Duration (Seconds)</h4>
            <label className="radio">
              <input
                type="radio"
                name="duration"
                onChange={handleDurationChange}
                value={10000}
                checked={props.duration == 10000}
              />
              10
            </label>
            <label className="radio">
              <input
                type="radio"
                name="duration"
                value={15000}
                onChange={handleDurationChange}
                checked={props.duration == 15000}
              />
              15
            </label>
            <label className="radio">
              <input
                type="radio"
                name="duration"
                value={30000}
                onChange={handleDurationChange}
                checked={props.duration == 30000}
              />
              30
            </label>
          </div>

          <div className="control flex-down">
            <h4>Transition Types</h4>
            <label className="radio">
              <input type="radio" name="transition" />
              Random
            </label>
            <label className="radio">
              <input type="radio" name="transition" />
              Slide
            </label>
            <label className="radio">
              <input type="radio" name="transition" />
              Fade
            </label>
          </div>

          <div className="control flex-down">
            <h4>Content Displayed</h4>
            <label className="checkbox">
              <input
                type="checkbox"
                name="contentType"
                value="item"
                checked={props.activeTypes.includes("item")}
                onChange={handleContentTypeChange}
              />
              Menu Items
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="contentType"
                value="section"
                checked={props.activeTypes.includes("section")}
                onChange={handleContentTypeChange}
              />
              Menu Sections
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="contentType"
                value="event"
                checked={props.activeTypes.includes("event")}
                onChange={handleContentTypeChange}
              />
              Events
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="contentType"
                value="shout"
                checked={props.activeTypes.includes("shout")}
                onChange={handleContentTypeChange}
              />
              Shout
            </label>
          </div>

          <div className="control full-width">
            <h4>Display Single Slide</h4>
            <p>
              This is useful for showcasing a new menu item, or event. Have an
              important message to your customers? Select the shout!
            </p>
            <div className="select">
              <select>
                <option>Select dropdown</option>
                <option>Menu Item A</option>
                <option>Menu Item B</option>
                <option>Shout</option>
              </select>
            </div>
            <label className="radio">
              <input type="radio" name="isList" />
              Show List View of all data
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PoweredToolsSlide
