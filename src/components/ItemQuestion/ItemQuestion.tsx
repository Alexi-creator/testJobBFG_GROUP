import React from 'react'
import styles from './ItemQuestion.module.scss'
import IconArrow from '../../assets/images/Arrow'
import cn from 'classnames'

export const ItemQuestion = () => {
  return (
    <div
      className={cn(styles.root, {
        [styles.isAnswered]: false,
      })}
    >
      <div className={styles.title}>ItemQuestion</div>
      <div className={styles.rate}>5</div>
      <div className={styles.arrows}>
        <IconArrow className={styles.arrowUp} />
        <IconArrow />
      </div>
    </div>
  )
}
