import axios, { AxiosInstance } from 'axios'

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ')
}

const apiClient = (): AxiosInstance => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // Create instance
  const instance = axios.create(defaultOptions)

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('accessToken')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })

  return instance
}

const swrFetcher = (url: string): Promise<any> =>
  apiClient()
    .get(url)
    .then((res) => res.data)

export { classNames, apiClient, swrFetcher }
