import { Component } from "react"

function randomKey(){
    return Math.random().toString(36).slice(2, 10);

}

const wrapperMap = (Component, array) => {
    const renderComponent = (item, key) => {
        console.log(Component);
    
        return (
            <Component key={`${key}-${randomKey()}`} item={item} />
        )
    }
    return array.map(renderComponent)
}



export {
    wrapperMap
}