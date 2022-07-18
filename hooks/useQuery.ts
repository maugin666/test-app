import { useEffect, useState } from 'react'
import Router from 'next/router'

interface Query {
  sort?: string
  filter?: string
  field?: string
  direction?: string
  value?: string
  page?: string
}

const useQuery = () => {
  const [queries, setQueries] = useState<Query>({})
  const getParameters = () => {
    return Router.query
  }
  const setParameters = (params: { [key: string]: string }) => {
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
