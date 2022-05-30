import React, { useState, useEffect } from "react";

//RRD
import { Link } from 'react-router-dom';
import { routes, routesDetails } from '../../../routes/routes'


//API
import { showAllStruttureGetApi } from "../../../services/api/struttura/strutturaApi";

//ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

//COMPONENTS
import GoBackButton from '../../../components/backOffice/hookComponents/goBackButton/GoBackButton'


//STYLE
import './MRA.scss'
import '../../../assets/variables/_common.scss'


let avgReview = 0

const MostRewApart = () => {

  const [state, setState] = useState({
    mostReviewedBuildingArray: [],
    windowWidth: window.innerWidth
  })

  //useEffect for window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  })

  //ComponentDidMount
  useEffect(() => {
    //API call
    showAllStruttureGetApi()
      .then(res => {
        if (res?.data?.list) {
          let arrayTest = res?.data?.list.map(({ lista_recensioni, ...rest }) => {
            let avgScore = 0
            if (lista_recensioni) {
              avgReview += lista_recensioni.length
              avgScore = lista_recensioni.reduce((a, b) => a += b.score, 0) / lista_recensioni.length
            }
            return { ...rest, lista_recensioni, avgScore }
          })

          avgReview = (avgReview / arrayTest.length)

          arrayTest = arrayTest.sort((a, b) => {
            if (a.avgScore > b.avgScore) {
              return -1
            } else if ((a.avgScore < b.avgScore)) {
              return +1
            } else {
              return 0
            }
          })
            .filter(filt => {
              return filt?.lista_recensioni?.length > avgReview
            })

          setState({
            ...state,
            mostReviewedBuildingArray: arrayTest
          })
        }
      })
  }, [])

  //Function to change windowWidth state
  function handleResize() {
    setState({
      ...state,
      windowWidth: window.innerWidth
    })
  }

  //Map function
  function renderStructures(item, key) {
    //Calculating avg score
    let avg = 0
    for (let i = 0; i < item?.lista_recensioni?.length; i++) {
      avg += item?.lista_recensioni[i]?.score
    }
    avg = (avg / item?.lista_recensioni?.length).toFixed(1)
    if (avg > 3) {
      return (
        <div key={key} className='structure-card-container my1 br3 p1'>
          <Link to={`/${routesDetails.detailProperty(item?.id)}`} className="linkToDetail flex linkN">
            <img className="image" src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcache.eupedia.com%2Fimages%2Fcontent%2Fburghley-2.jpg&f=1&nofb=1"} />
            <div className="structure-card-info my1">
              <h3>{item?.nome_struttura}</h3>
              <p>{item?.indirizzo?.citta}</p>
              <p><FontAwesomeIcon icon={faStar} />{avg}({item?.lista_recensioni?.length})</p>
            </div>
          </Link>
        </div>
      )
    }
  }

  return (
    <>
      <div className="mra-page-container">
        {
          state.windowWidth < 991 &&
          <div className="back-button"><GoBackButton /></div>
        }
        <div className="flex column aiCenter jcCenter">
          <h1 className="title fsL">Most Reviewed Apartments</h1>
          {
            state.mostReviewedBuildingArray.map(renderStructures)
          }
        </div>
      </div>

    </>
  );
};

export default MostRewApart