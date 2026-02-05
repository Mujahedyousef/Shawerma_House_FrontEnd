import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import compression from 'compression'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
  : ''
const ssrManifest = isProduction
  ? fs.readFileSync(path.resolve(__dirname, 'dist/client/.vite/ssr-manifest.json'), 'utf-8')
  : undefined

// Create Express app
const app = express()

// Add compression
app.use(compression())

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  app.use(base, express.static(path.resolve(__dirname, 'dist/client'), { 
    index: false,
    maxAge: '1y',
  }))
}

// Serve HTML with SSR
app.use('*', async (req, res, next) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // Development: read from file system
      template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      // Production: use pre-built files
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    // Render the app HTML
    const rendered = await render(url, {
      // Pass any initial data or context here
      apiUrl: process.env.API_URL || 'http://localhost:3001/api',
    })

    // Replace placeholder in HTML template
    const html = template
      .replace('<!--app-html-->', rendered.html)
      .replace('<!--app-head-->', rendered.head || '')

    // Send rendered HTML
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    if (vite) {
      vite.ssrFixStacktrace(e)
    }
    console.error(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Frontend SSR server running on port ${port}`)
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 Server: http://localhost:${port}`)
})
