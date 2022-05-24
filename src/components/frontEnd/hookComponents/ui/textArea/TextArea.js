import React from 'react'

function TextArea(props) {

    const handleOnChange = (e) => {
        props.callback(e.target.value);
     }

    return (
        <>
            <textarea
            onChange={handleOnChange}
            className={props.className}
            >

            </textarea>
        </>
    )
}

export default TextArea