import React from 'react'
import styles from './ItemQuestion.module.scss'
import IconArrow from '../../assets/images/Arrow'
import cn from 'classnames'
import { IItem, increment, decrement } from '../../redux/slices/questionsSlice'
import { useDispatch } from 'react-redux'

export const ItemQuestion: React.FC<IItem> = (props) => {
  const { question_id, owner, is_answered, view_count, score, title } = props
  const [open, setOpen] = React.useState<boolean>(false)
  const dispatch = useDispatch()

  const incrementScore = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    dispatch(increment(question_id))
  }

  const decrementScore = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    dispatch(decrement(question_id))
  }

  return (
    <div
      className={cn(styles.root, {
        [styles.isAnswered]: is_answered,
        [styles.open]: open,
      })}
      onClick={() => setOpen((prev) => !prev)}
      role="presentation"
    >
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <div className={styles.rate}>{score}</div>
        <div className={styles.arrows}>
          <IconArrow
            onClick={(e: React.MouseEvent<SVGSVGElement>) => incrementScore(e)}
            className={styles.arrowUp}
          />
          <IconArrow
            onClick={(e: React.MouseEvent<SVGSVGElement>) => decrementScore(e)}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div>Имя создателя вопроса: {owner.display_name}</div>
        <div>Рейтинг создателя вопроса: {owner.reputation}</div>
        <div>Колличество просмотров: {view_count}</div>
      </div>
    </div>
  )
}
