import React from 'react'
import styles from './ItemQuestion.module.scss'
import IconArrow from '../../assets/images/Arrow'
import cn from 'classnames'
import { IItem, increment, decrement } from '../../redux/slices/questionsSlice'
import { useDispatch } from 'react-redux'

import type { Identifier, XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd'

interface CardProps extends IItem {
  moveCard: (dragIndex: number, hoverIndex: number) => void
  index: number
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const ItemQuestion: React.FC<CardProps> = (props) => {
  const {
    question_id,
    owner,
    is_answered,
    view_count,
    score,
    title,
    moveCard,
    index,
  } = props
  const [open, setOpen] = React.useState<boolean>(false)
  const dispatch = useDispatch()

  const ref = React.useRef<HTMLDivElement>(null)

  const incrementScore = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    dispatch(increment(question_id))
  }

  const decrementScore = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    dispatch(decrement(question_id))
  }

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { question_id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
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
