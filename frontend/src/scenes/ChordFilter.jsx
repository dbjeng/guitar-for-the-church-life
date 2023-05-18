import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap';
import axios from 'axios'

import ChordFilterBox from '../components/ChordFilterBox';

import './ChordFilter.css'

const ChordFilter = () => {
  const all_chords = axios.get('http://127.0.0.1:8000/all_chords');
  console.log(all_chords)

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