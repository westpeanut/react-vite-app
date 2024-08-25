/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './../routes/__root'
import { Route as PlaceholderImport } from './../routes/placeholder'
import { Route as IndexImport } from './../routes/index'

// Create/Update Routes

const PlaceholderRoute = PlaceholderImport.update({
  path: '/placeholder',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/placeholder': {
      id: '/placeholder'
      path: '/placeholder'
      fullPath: '/placeholder'
      preLoaderRoute: typeof PlaceholderImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({ IndexRoute, PlaceholderRoute })

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/placeholder"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/placeholder": {
      "filePath": "placeholder.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
