import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { PatientSelector } from '../PatientSelector'
import Mood from '../WeekdayMood'

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    background-color: #F9F9F9;
    /* system font stack */
    font-family: -apple-system, 
                 BlinkMacSystemFont,
                 "Segoe UI",
                 Helvetica,
                 Arial,
                 sans-serif,
                 "Apple Color Emoji",
                 "Segoe UI Emoji",
                 "Segoe UI Symbol";
  }
  * {
    box-sizing: border-box;
  }
`

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

function App() {
  const [selectedPatient, setSelectedPatient] = useState<string>('')
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <PatientSelector onChangePatient={setSelectedPatient} />
        <Mood patient={selectedPatient} />
      </AppContainer>
    </>
  )
}

export default App
