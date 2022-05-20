import React, { ReactElement } from "react"


/**
 * random generate a random number 
 * toString(36) convert the number in base36(ASCII standard)
 * slice() take the string from index(2) and index(9)
 */
function randomKey() {
    return Math.random().toString(36).slice(2, 10);

}
/**
 * Function map custom. Render the component given as parameters
 * @param {ReactElement} Component React component you want to cycle through array
 * @param {array} array array to cycle with.
 * @param {Function} callback [optional] a callback function
 * @returns {ReactElement} returns given React Component cycled through the given array
 */
const wrapperMap = (Component, array, callback = null) => {

    const renderComponent = (item, key) => {
        return (
            <Component key={`${key}-${randomKey()}`} item={item} callback={callback} />
        )
    }
    return array.map(renderComponent)
}


// const lessThenFive = (item) => {
//     return item < 5
// }


/**
 * Function filter and map custom. Render the component given as parameters that pass the trueStatement condition
 * @param  {ReactElement} Component
 * @param  {array} array
 * @param  {function} trueStatement
 * @returns {ReactElement} return the array of the input parameters component filtered by trueStatement condition
 */
const wrapperFilter = (Component, array, trueStatement) => {

    let filtered = array.filter(trueStatement)
    return wrapperMap(Component, filtered)
}

export {
    wrapperMap,
    wrapperFilter,
    randomKey
}