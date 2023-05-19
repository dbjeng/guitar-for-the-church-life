import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap';
import axios from 'axios'

import ChordFilterBox from '../components/ChordFilterBox';

import './ChordFilter.css'

const ChordFilter = () => {
  var all_chords;
  axios.get('http://127.0.0.1:8000/all_chords')
    .then(response => {
      all_chords = response.data;
      console.log(all_chords);
    })
    .catch(error => {
      console.error(error);
    });


  return (
    <React.Fragment>
      <Container>
        <h3>Search for the songs you can play by selecting the chords you know.</h3>
        <ChordFilterBox chords={all_chords} />
      </Container>
    </React.Fragment>
  )
}

export default ChordFilter;