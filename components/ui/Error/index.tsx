import React from 'react'
import styles from './Error.module.css'

interface ErrorProps {
  error: {
    code: number
    message: string
  }
}

const Error = (props: ErrorProps): JSX.Element => {
  return (
    <section className={styles.error}>
      <h1>{props.error.code}</h1>
      <p>{props.error.message}</p>
    </section>
  )
}

export default Error
