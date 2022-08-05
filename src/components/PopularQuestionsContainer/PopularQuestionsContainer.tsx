import React from 'react'
import styles from './PopularQuestionsContainer.module.scss'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { ItemQuestion } from '../ItemQuestion/ItemQuestion'
import { Button } from '../Button/Button'
import {
  fetchQiestions,
  statusEnum,
  IItem,
} from '../../redux/slices/questionsSlice'

import type { AppDispatch, RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { ItemQuestionSkeleton } from '../ItemQuestion/ItemQuestion.skeleton'

import update from 'immutability-helper'

type PopupClick = MouseEvent & {
  path: Node[]
}

export const PopularQuestionsContainer = () => {
  const [cards, setCards] = React.useState<IItem[]>([])
  const [openOrder, setOpenOrder] = React.useState<number>(-1)
  const wrapCardsRef = React.useRef<HTMLDivElement>(null)

  const [startDate, setStartDate] = React.useState(new Date(2018, 0, 1))
  const [dateIsChange, setDateIsChange] = React.useState<boolean>(false)
  const { items, status } = useSelector(
    (state: RootState) => state.questionsSlice
  )
  const dispatch = useDispatch<AppDispatch>()

  React.useEffect(() => {
    setCards(items)
  }, [items])

  // close items if click not on item
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick

      if (wrapCardsRef.current && !_event.path.includes(wrapCardsRef.current)) {
        setOpenOrder(-1)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  const changeDate = (currentDate: Date) => {
    setStartDate(currentDate)
    setDateIsChange(true)
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

  // below react dnd
  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: IItem[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as IItem],
          ],
        })
      )
    },
    []
  )

  const renderCard = React.useCallback(
    (question: IItem, index: number, openOrder: number) => {
      return (
        <ItemQuestion
          key={question.question_id}
          {...question}
          moveCard={moveCard}
          index={index}
          openOrder={openOrder}
          setOpenOrder={setOpenOrder}
        />
      )
    },
    []
  )

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
      <div ref={wrapCardsRef} className={styles.list} style={{ width: '100%' }}>
        {status === statusEnum.loading &&
          [...new Array(5)].map((_, index) => (
            <ItemQuestionSkeleton key={index} viewBox="0 0 550 75" />
          ))}
        {status === statusEnum.success && (
          <>{cards.map((card, i) => renderCard(card, i, openOrder))}</>
        )}
      </div>
    </div>
  )
}
