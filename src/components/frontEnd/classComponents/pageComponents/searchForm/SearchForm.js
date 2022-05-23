// import FullCalendar from '@fullcalendar/react';
import React, { Component } from 'react'
import SearchPlace from '../../../hookComponents/ui/searchPlace/SearchPlace';

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <>
                <section className='searchFormContainer'>
                    <SearchPlace />
                    {/* <FullCalendar /> */}
                </section>
            </>
        )
    }
}

export default SearchForm;