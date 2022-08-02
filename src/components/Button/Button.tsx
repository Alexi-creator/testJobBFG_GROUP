import React from 'react'
import styles from './Button.module.scss'
import { ButtonProps } from './Button.props'
import cn from 'classnames'

export const Button: React.FC<ButtonProps> = ({
  appearance,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.transparent]: appearance === 'transparent',
      })}
      {...props}
    >
      {children}
    </button>
  )
}
