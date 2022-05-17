import React, { ReactElement } from "react"


/**
 * random generate a random number 
 * toString(36) convert the number in base36(ASCII standard)
 * slice() take the string from index(2) and index(9)
 */
function randomKey(){
    return Math.random().toString(36).slice(2, 10);

}
/**
 * Function map custom. Render the component given as parameters
 * @param  {ReactElement} Component
 * @param  {array} array
 * @returns {ReactElement} return the array of the input parameters component
 */
const wrapperMap = (Component, array) => {  

    const renderComponent = (item, key) => {
        return (
            <Component key={`${key}-${randomKey()}`} item={item} />
        )
    }
    return array.map(renderComponent)
}

// const lessThenFive = (item) => {
//     item < 5 && item
// }


/**
 * Function filter and map custom. Render the component given as parameters that pass the trueStatement condition
 * @param  {ReactElement} Component
 * @param  {array} array
 * @param  {function} trueStatement
 * @returns {ReactElement} return the array of the input parameters component filtered by trueStatement condition
 */
const wrapperFilter = (Component, array, trueStatement) => {
    const renderComponent = (item) => {
    
        return (
            <Component key={`${key}-${randomKey()}`} item={item} />
        )
    }
    return array.filter(renderComponent)
}

export {
    wrapperMap,
    wrapperFilter
}