import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import axios from "axios-jsonp"
import jsonAdapter from "axios-jsonp"
import ShowcaseInfo from "../components/showcaseInfo"

const IndexPage = () => {
  const [menuData, setMenuData] = useState({})
  const [eventData, setEventData] = useState({})
  const [recurringData, setRecurringEventData] = useState({})
  const gonationID = process.env.GONATIONID
  const [formattedMenu, setFormattedMenu] = useState([])

  // Make request for menu data
  // todo account for > 1 powered lists / dynamic
  const requestMenuData = id => {
    axios({
      url: `https://data.prod.gonation.com/pl/get?profile_id=${id}`,
      adapter: jsonAdapter,
    }).then(res => {
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

  const someData = []

  const buildSection = element => {
    element.inventory.forEach(item => {
      console.log("item: ", item)
      if (!item.section) {
        if (item.item.photo_id !== null) {
          someData.push({
            name: item.item.name,
            desc: item.item.desc,
            sectionName: element.section.name,
            image: item.item.imageUrl,
            price:
              item.item.variants.length > 0 ? item.item.variants[0].price : "",
          })
        }
      } else {
        console.log("ELSE", item)
        buildSection(item)
      }
    })
  }

  const runMenu = () => {
    menuData.inventory.forEach(element => {
      buildSection(element)
      console.log(someData)
    })
    setFormattedMenu(someData)
  }

  useEffect(() => {
    console.log("here")
    if (menuData && menuData.section) {
      console.log(menuData)
      runMenu()
    }
  }, [menuData])

  return (
    <Layout>
      <h1>GONATION TV</h1>
      <h2>{menuData.name}</h2>
      <ul>
        {formattedMenu.length
          ? formattedMenu.map(item => <li>{item.name}</li>)
          : ""}
        {formattedMenu.length ? (
          <ShowcaseInfo
            title={formattedMenu[0].name}
            description={formattedMenu[0].desc}
            image={formattedMenu[0].image}
            price={formattedMenu[0].price}
          />
        ) : (
          ""
        )}
      </ul>
    </Layout>
  )
}

export default IndexPage
