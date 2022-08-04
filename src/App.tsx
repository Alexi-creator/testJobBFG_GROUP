import React from 'react'
import './scss/styles.scss'
import { PopularQuestionsContainer } from './components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const App = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <PopularQuestionsContainer />
      </DndProvider>
    </>
  )
}
