import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        //`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
        `http://localhost:3005/auth/csrf`
      )
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
      console.log(data.csrfToken)
    }
    getCsrfToken()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Verdana, sans-serif',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
