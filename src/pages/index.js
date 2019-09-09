import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import axios from "axios-jsonp"
import jsonAdapter from "axios-jsonp"
import { request } from "https"

const IndexPage = () => {
  const [menuData, setMenuData] = useState({})
  const [eventData, setEventData] = useState({})
  const [recurringData, setRecurringEventData] = useState({})
  const gonationID = process.env.GONATIONID
  const [isLoading, setIsLoading] = useState(false)

  // Make request for menu data
  // todo account for > 1 powered lists / dynamic
  const requestMenuData = id => {
    axios({
      url: `https://data.prod.gonation.com/pl/get?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(async res => {
      setMenuData(res.data[0])
      console.log("menu datares: ", res.data[0])
    })
  }

  const requestEventData = id => {
    axios({
      url: `https://data.prod.gonation.com/profile/events?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      setEventData(res)
      console.log("regular event res: ", res)
    })
  }

  const requestRecurringEventData = id => {
    axios({
      url: `https://data.prod.gonation.com/profile/recurringevents?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
      setRecurringEventData(res)
      console.log("recurring res: ", res)
    })
  }

  useEffect(() => {
    requestMenuData(gonationID)
    requestEventData(gonationID)
    requestRecurringEventData(gonationID)
  }, [])

  const renderItemsFromSection = section => {}

  const filterMenuData = () => {
    console.log("menu data!!", menuData)
    const filteredMenuData = menuData.inventory.map(section => {
      return section.inventory.filter(item => {
        console.log(item)
        if (item.item) {
          return (
            item.item.imagePrefix !==
            "gonation.data.prod/default/img-itm-cover-full.png"
          )
        } else {
          console.log("no prefix")
        }
      })
    })
    console.log("filtered Menu is: ", filteredMenuData)
    return
  }

  setTimeout(function() {
    filterMenuData()
  }, 3000)

  return (
    <Layout>
      <h1>GONATION TV</h1>
      <h2>{menuData.name}</h2>
    </Layout>
  )
}

export default IndexPage
