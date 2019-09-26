import React, { useState } from "react"

const PoweredToolsSlide = props => {
  const [currentDuration, setCurrentDuration] = useState(props.duration)
  const [showForm, setShowForm] = useState(false)
  const handleDurationChange = event => {
    setCurrentDuration(event.target.value)
    props.setSlideDuration(event.target.value)
  }

  const handleContentTypeChange = event => {
    // console.log(event.target.value)
  }

  const handleListView = () => {
    props.setIsListView(true)
  }

  const handleDefaultView = () => {
    props.setIsListView(false)
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

          <div className="control full-width columns">
            <div className="column">
              <h4>TV Display Type: </h4>
              <p>
                Shuffle, Side by side, and Full Screen are a great way to
                showcase your food/items/events with images. List View will show
                your customers everything you have to offer.
              </p>
              <div className="select">
                <label className="radio">
                  <input
                    type="radio"
                    name="isList"
                    onChange={handleDefaultView}
                    checked={!props.isListView}
                  />
                  Display single items
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="isList"
                    onChange={handleListView}
                    checked={props.isListView}
                  />
                  Display List
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="isBoth"
                    // onChange={handleListView}
                    // checked={props.isListView}
                  />
                  Display Both
                </label>
              </div>
              <div className="flex-down">
                <h4>Choose your sections to diplay:</h4>
                {props.isListView
                  ? props.listData.map((section, idx) => (
                      <label key={`${section}-${idx}`} className="checkbox">
                        <input
                          type="checkbox"
                          name="contentType"
                          // onChange={handleSectionToggle}
                        />
                        {section.name}
                      </label>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PoweredToolsSlide
