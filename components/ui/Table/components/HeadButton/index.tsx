import React from 'react'
import styles from './HeadButton.module.css'

interface HeadButtonProps {
  content: string
  handleClick: () => void
}

const HeadButton = (props: HeadButtonProps): JSX.Element => (
  <button
    type="button"
    onClick={() => props.handleClick()}
    className={styles.headButton}
  >
    {props.content}
  </button>
)

export default HeadButton
