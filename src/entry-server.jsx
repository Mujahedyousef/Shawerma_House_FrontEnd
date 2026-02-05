import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import i18n from './i18n/i18n.server'

export async function render(url, context) {
  // Create a fresh QueryClient for each request
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        cacheTime: 60 * 1000,
        retry: false,
      },
    },
  })

  // Render the app
  const html = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </I18nextProvider>
    </QueryClientProvider>
  )

  // Get dehydrated state for client hydration
  const dehydratedState = dehydrate(queryClient)

  return {
    html,
    head: `
      <script>
        window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState).replace(/</g, '\\u003c')};
      </script>
    `,
  }
}
