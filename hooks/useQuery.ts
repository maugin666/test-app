import { useEffect, useState } from 'react'
import Router from 'next/router'

const useQuery = () => {
  const [queries, setQueries] = useState({})
  const getParameters = () => {
    return Router.query
  }
  const setParameters = (params: Object) => {
    Router.push({
      query: { ...queries, ...params },
    })
  }
  const setParameter = (param: string, value: string | number) => {
    Router.push({
      query: { ...queries, [param]: value },
    })
  }
  const getParameter = (param: string) => {
    return Router.query[param]
  }

  useEffect(() => {
    const params = getParameters()

    setQueries((prevState) => {
      return { ...prevState, ...params }
    })
  }, [])

  return { queries, getParameters, setParameters, setParameter, getParameter }
}

export default useQuery
