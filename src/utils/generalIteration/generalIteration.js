import { Component } from "react"

function randomKey(){
    return Math.random().toString(36).slice(2, 10);

}
/**
 * @param  {} Component
 * @param  {} array
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

const wrapperFilter = (Component, array, trueStatement) => {
    const renderComponent = (item) => {
    
        return (
            <Component key={`${key}-${randomKey()}`} item={item} />
        )
    }
    return array.filter(renderComponent)
}

export {
    wrapperMap
}