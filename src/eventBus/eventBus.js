//DECLARATION OF METHOD FOR CREATE GET AND REMOVE CUSTOM EVENT

const eventBus = {
    onListening(event, callback) {  // method to call for get back the data saved in the event
        const callbackEvent = (e) => {  //function for get the data
            e.stopImmediatePropagation();  //stopping the listening after caught the first data
            callback(e.detail);
        }

        document.addEventListener(event, callbackEvent, false)  
    },

    onDispatch(event, data) {  // method for make a dispatch. Takes two parameters. thr 1st in the key for the event and the 2nd the data we want to send
        document.dispatchEvent(new CustomEvent(event, { detail: data }))
    },

    onRemoveEventListener(event, callback = null) {  // method for remove the eventListener, aka DOM
        document.removeEventListener(event, callback)
    }

}

export {
    eventBus
}