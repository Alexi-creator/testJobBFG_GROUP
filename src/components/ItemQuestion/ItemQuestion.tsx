import React from 'react'
import styles from './ItemQuestion.module.scss'
import IconArrow from '../../assets/images/Arrow'
import cn from 'classnames'

export const ItemQuestion = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  return (
    <div
      className={cn(styles.root, {
        [styles.isAnswered]: false,
        [styles.open]: open,
      })}
      onClick={() => setOpen((prev) => !prev)}
      role="presentation"
    >
      <div className={styles.top}>
        <div className={styles.title}>ItemQuestion</div>
        <div className={styles.rate}>5</div>
        <div className={styles.arrows}>
          <IconArrow className={styles.arrowUp} />
          <IconArrow />
        </div>
      </div>
      <div className={styles.bottom}>
        <div>Имя создателя вопроса: user</div>
        <div>Рейтинг создателя вопроса: 42</div>
        <div>Колличество просмотров: 54000</div>
      </div>
    </div>
  )
}
