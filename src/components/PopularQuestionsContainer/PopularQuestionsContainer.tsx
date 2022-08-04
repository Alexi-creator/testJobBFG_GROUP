import React from 'react'
import styles from './PopularQuestionsContainer.module.scss'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { ItemQuestion } from '../ItemQuestion/ItemQuestion'
import { Button } from '../Button/Button'
import { fetchQiestions, statusEnum } from '../../redux/slices/questionsSlice'

import type { AppDispatch, RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { ItemQuestionSkeleton } from '../ItemQuestion/ItemQuestion.skeleton'

export const PopularQuestionsContainer = () => {
  const [startDate, setStartDate] = React.useState(new Date(2018, 0, 1))
  const [dateIsChange, setDateIsChange] = React.useState<boolean>(false)
  const { items, status } = useSelector(
    (state: RootState) => state.questionsSlice
  )
  const dispatch = useDispatch<AppDispatch>()

  const changeDate = (currentDate: Date) => {
    setStartDate(currentDate)
    setDateIsChange(true)
    console.log(currentDate)
  }

  const searchNewDate = (searchDate: Date) => {
    dispatch(
      fetchQiestions(
        Number(new Date(searchDate).getTime().toString().slice(0, -3))
      )
    )
    setDateIsChange(false)
  }

  React.useEffect(() => {
    dispatch(
      fetchQiestions(
        Number(new Date(startDate).getTime().toString().slice(0, -3))
      )
    )
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <span>
          5 самых популярных вопросов на StackoverFlow, содержащих
          &apos;react-redux&apos; в наименовании, начиная с даты:
        </span>
        &nbsp;
      </div>
      <div className={styles.date}>
        <DatePicker
          className={styles.inputDate}
          selected={new Date(startDate)}
          onChange={(dateChoose: Date) => {
            changeDate(dateChoose)
          }}
        />
        {dateIsChange && (
          <Button
            onClick={() => searchNewDate(startDate)}
            className={styles.buttonFind}
            appearance="transparent"
          >
            найти
          </Button>
        )}
      </div>
      <div className={styles.list} style={{ width: '100%' }}>
        {status === statusEnum.loading &&
          [...new Array(5)].map((_, index) => (
            <ItemQuestionSkeleton key={index} viewBox="0 0 550 75" />
          ))}
        {status === statusEnum.success &&
          items.map((question) => (
            <ItemQuestion key={question.question_id} {...question} />
          ))}
      </div>
    </div>
  )
}
