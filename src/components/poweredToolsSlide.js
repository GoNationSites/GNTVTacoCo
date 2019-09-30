import React, { useState, useEffect } from "react"
import poweredBy from "../images/poweredby.png"
import SectionToggleCheckbox from "./sectionToggleCheckbox"
import ActiveTypesForm from "./activeTypesForm"
const PoweredToolsSlide = props => {
  const [currentDuration, setCurrentDuration] = useState(props.duration)
  const [showForm, setShowForm] = useState(false)
  const [filteredArr, setFilteredArr] = useState([])
  const [theArray, setTheArray] = useState(props.activeTypes)

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

  const handleAdd = value => {
    setTheArray([...theArray, value])
  }

  const handleRemoval = value => {
    setTheArray(theArray.filter(item => item !== value))
  }

  useEffect(() => {
    props.setFilteredOutSections(filteredArr)
    props.setActiveTypes(theArray)
  }, [filteredArr, theArray])

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
            <div className="column is-2 control flex-down">
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

            <div className="column control full-width">
              <div className=" columns">
                <div className="column is-5">
                  <h4>TV Display Type: </h4>
                  <p>
                    Single items showcase a single item/event/shout with large
                    images. List type displays all of your items you have to
                    offer.
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
                </div>

                <ActiveTypesForm
                  handleAdd={handleAdd}
                  handleRemoval={handleRemoval}
                />

                <div className="flex-down control column">
                  <h4>Choose your sections to display:</h4>
                  <div className="sections-checkbox-wrap">
                    {props.listData.map((section, idx) => {
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
          </div>
        </form>
      </div>
    </div>
  )
}

export default PoweredToolsSlide
