import React from 'react'
import { ItemQuestion } from '../ItemQuestion/ItemQuestion'
import styles from './PopularQuestionsContainer.module.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const PopularQuestionsContainer = () => {
  const [startDate, setStartDate] = React.useState(new Date(2018, 0, 1))

  React.useEffect(() => {
    console.log(startDate)
  }, [startDate])

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <span>
          5 самых популярных вопросов на StackoverFlow, содержащих
          &apos;react-redux&apos; в наименовании, начиная с
          <DatePicker
            className={styles.inputDate}
            selected={new Date(startDate)}
            onChange={(date: Date) => {
              setStartDate(date)
            }}
          />
        </span>
        &nbsp;
      </div>
      <div className={styles.list}>
        <ItemQuestion />
        <ItemQuestion />
      </div>
    </div>
  )
}
