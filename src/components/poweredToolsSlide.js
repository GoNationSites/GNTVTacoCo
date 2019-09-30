import React, { useState, useEffect } from "react"
import poweredBy from "../images/poweredby.png"
import { filter } from "minimatch"
import SectionToggleCheckbox from "./sectionToggleCheckbox"
import ActiveTypesForm from "./activeTypesForm"
const PoweredToolsSlide = props => {
  const [currentDuration, setCurrentDuration] = useState(props.duration)
  const [showForm, setShowForm] = useState(false)
  const [filteredArr, setFilteredArr] = useState([])
  const [dataType, setDataType] = useState(props.activeTypes)
  const handleDurationChange = event => {
    setCurrentDuration(event.target.value)
    props.setSlideDuration(event.target.value)
  }

  const handleListView = () => {
    props.setIsListView(true)
  }

  const handleDefaultView = () => {
    props.setIsListView(false)
  }

  const handleDisplayType = type => {
    props.setDisplayType(type)
  }

  const addSectionToTV = section => {
    setFilteredArr([...filteredArr, section.name])
    props.setFilteredOutSections(filteredArr)
  }

  const removeSectionFromTV = section => {
    filteredArr.splice(filteredArr.indexOf(section.name), 1)
    setFilteredArr(filteredArr)
    props.setFilteredOutSections(filteredArr)
  }

  const addDataTypes = dataName => {
    setDataType([...dataType, dataName])
    props.setActiveTypes(dataType)
  }

  const removeDataTypes = dataName => {
    console.log("removing", dataName)
    console.log(dataType.splice(dataType.indexOf(dataName), 1))
    dataType.splice(dataType.indexOf(dataName), 1)
    console.log("setting data type to: ", dataType)
    setDataType(dataType)
    props.setActiveTypes(dataType)
  }

  useEffect(() => {
    props.setFilteredOutSections(filteredArr)
    props.setActiveTypes(dataType)
  }, [filteredArr, dataType])

  return (
    <div
      className={`powered-by-bar ${
        showForm ? "animated slideInUp faster tools-active" : ""
      }`}
    >
      <p className="has-text-centered" onClick={() => setShowForm(!showForm)}>
        <img src={poweredBy}></img>
      </p>
      <div className={`powered-tools-form-wrap ${showForm ? "" : "is-hidden"}`}>
        <form className="powered-tools-form">
          <h1 className="has-text-centered">GoNation TV Powered Settings</h1>

          <div className="columns is-centered form-col-container">
            <div className="column control flex-down">
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

            <div className="column control full-width columns">
              <div className="column">
                <h4>TV Display Type: </h4>
                <p>
                  Shuffle, Side by side, and Full Screen are a great way to
                  showcase your food/items/events with images. List View will
                  show your customers everything you have to offer.
                </p>
                <div className="select">
                  <label className="radio">
                    <input
                      type="radio"
                      name="isList"
                      onChange={() => handleDisplayType("default")}
                      checked={props.displayType === "default"}
                    />
                    Display single items
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="isList"
                      onChange={() => handleDisplayType("list")}
                      checked={props.displayType === "list"}
                    />
                    Display List
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="isBoth"
                      onChange={() => handleDisplayType("both")}
                      checked={props.displayType === "both"}
                    />
                    Display Both
                  </label>
                </div>
                <div className="flex-down control">
                  <h4>Choose your sections to diplay:</h4>
                  {props.listData.map((section, idx) => {
                    console.log("props are: ", props)
                    return (
                      <SectionToggleCheckbox
                        section={section}
                        idx={idx}
                        setFilteredArr={setFilteredArr}
                        addSectionToTV={addSectionToTV}
                        removeSectionFromTV={removeSectionFromTV}
                        // handleSectionSelection={handleSectionSelection}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PoweredToolsSlide
