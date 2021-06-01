import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ')
}

const apiClient = (cookieToken = null): AxiosInstance => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // Create instance
  const instance = axios.create(defaultOptions)

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = cookieToken || localStorage.getItem('accessToken')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })

  return instance
}

const swrFetcher = (url: string, configs: AxiosRequestConfig): Promise<any> =>
  apiClient()
    .get(url, configs)
    .then((res) => res.data)

export { classNames, apiClient, swrFetcher }
