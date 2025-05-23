/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedLayoutImport } from './routes/_authenticated/_layout'
import { Route as AuthenticatedLayoutIndexImport } from './routes/_authenticated/_layout/index'
import { Route as AuthenticatedLayoutStoryIndexImport } from './routes/_authenticated/_layout/story/index'
import { Route as AuthenticatedLayoutQuizIndexImport } from './routes/_authenticated/_layout/quiz/index'
import { Route as AuthenticatedLayoutPetIndexImport } from './routes/_authenticated/_layout/pet/index'
import { Route as AuthenticatedLayoutPetRequestIndexImport } from './routes/_authenticated/_layout/pet-request/index'
import { Route as AuthenticatedLayoutChatIndexImport } from './routes/_authenticated/_layout/chat/index'
import { Route as AuthenticatedLayoutQuizIdIndexImport } from './routes/_authenticated/_layout/quiz/$id/index'
import { Route as AuthenticatedLayoutPetIdIndexImport } from './routes/_authenticated/_layout/pet/$id/index'
import { Route as AuthenticatedLayoutAnswerIdIndexImport } from './routes/_authenticated/_layout/answer/$id/index'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedLayoutRoute = AuthenticatedLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedLayoutIndexRoute = AuthenticatedLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedLayoutRoute,
} as any)

const AuthenticatedLayoutStoryIndexRoute =
  AuthenticatedLayoutStoryIndexImport.update({
    id: '/story/',
    path: '/story/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutQuizIndexRoute =
  AuthenticatedLayoutQuizIndexImport.update({
    id: '/quiz/',
    path: '/quiz/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutPetIndexRoute =
  AuthenticatedLayoutPetIndexImport.update({
    id: '/pet/',
    path: '/pet/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutPetRequestIndexRoute =
  AuthenticatedLayoutPetRequestIndexImport.update({
    id: '/pet-request/',
    path: '/pet-request/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutChatIndexRoute =
  AuthenticatedLayoutChatIndexImport.update({
    id: '/chat/',
    path: '/chat/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutQuizIdIndexRoute =
  AuthenticatedLayoutQuizIdIndexImport.update({
    id: '/quiz/$id/',
    path: '/quiz/$id/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutPetIdIndexRoute =
  AuthenticatedLayoutPetIdIndexImport.update({
    id: '/pet/$id/',
    path: '/pet/$id/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

const AuthenticatedLayoutAnswerIdIndexRoute =
  AuthenticatedLayoutAnswerIdIndexImport.update({
    id: '/answer/$id/',
    path: '/answer/$id/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_layout': {
      id: '/_authenticated/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedLayoutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_layout/': {
      id: '/_authenticated/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedLayoutIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/chat/': {
      id: '/_authenticated/_layout/chat/'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof AuthenticatedLayoutChatIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/pet-request/': {
      id: '/_authenticated/_layout/pet-request/'
      path: '/pet-request'
      fullPath: '/pet-request'
      preLoaderRoute: typeof AuthenticatedLayoutPetRequestIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/pet/': {
      id: '/_authenticated/_layout/pet/'
      path: '/pet'
      fullPath: '/pet'
      preLoaderRoute: typeof AuthenticatedLayoutPetIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/quiz/': {
      id: '/_authenticated/_layout/quiz/'
      path: '/quiz'
      fullPath: '/quiz'
      preLoaderRoute: typeof AuthenticatedLayoutQuizIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/story/': {
      id: '/_authenticated/_layout/story/'
      path: '/story'
      fullPath: '/story'
      preLoaderRoute: typeof AuthenticatedLayoutStoryIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/answer/$id/': {
      id: '/_authenticated/_layout/answer/$id/'
      path: '/answer/$id'
      fullPath: '/answer/$id'
      preLoaderRoute: typeof AuthenticatedLayoutAnswerIdIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/pet/$id/': {
      id: '/_authenticated/_layout/pet/$id/'
      path: '/pet/$id'
      fullPath: '/pet/$id'
      preLoaderRoute: typeof AuthenticatedLayoutPetIdIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/quiz/$id/': {
      id: '/_authenticated/_layout/quiz/$id/'
      path: '/quiz/$id'
      fullPath: '/quiz/$id'
      preLoaderRoute: typeof AuthenticatedLayoutQuizIdIndexImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedLayoutRouteChildren {
  AuthenticatedLayoutIndexRoute: typeof AuthenticatedLayoutIndexRoute
  AuthenticatedLayoutChatIndexRoute: typeof AuthenticatedLayoutChatIndexRoute
  AuthenticatedLayoutPetRequestIndexRoute: typeof AuthenticatedLayoutPetRequestIndexRoute
  AuthenticatedLayoutPetIndexRoute: typeof AuthenticatedLayoutPetIndexRoute
  AuthenticatedLayoutQuizIndexRoute: typeof AuthenticatedLayoutQuizIndexRoute
  AuthenticatedLayoutStoryIndexRoute: typeof AuthenticatedLayoutStoryIndexRoute
  AuthenticatedLayoutAnswerIdIndexRoute: typeof AuthenticatedLayoutAnswerIdIndexRoute
  AuthenticatedLayoutPetIdIndexRoute: typeof AuthenticatedLayoutPetIdIndexRoute
  AuthenticatedLayoutQuizIdIndexRoute: typeof AuthenticatedLayoutQuizIdIndexRoute
}

const AuthenticatedLayoutRouteChildren: AuthenticatedLayoutRouteChildren = {
  AuthenticatedLayoutIndexRoute: AuthenticatedLayoutIndexRoute,
  AuthenticatedLayoutChatIndexRoute: AuthenticatedLayoutChatIndexRoute,
  AuthenticatedLayoutPetRequestIndexRoute:
    AuthenticatedLayoutPetRequestIndexRoute,
  AuthenticatedLayoutPetIndexRoute: AuthenticatedLayoutPetIndexRoute,
  AuthenticatedLayoutQuizIndexRoute: AuthenticatedLayoutQuizIndexRoute,
  AuthenticatedLayoutStoryIndexRoute: AuthenticatedLayoutStoryIndexRoute,
  AuthenticatedLayoutAnswerIdIndexRoute: AuthenticatedLayoutAnswerIdIndexRoute,
  AuthenticatedLayoutPetIdIndexRoute: AuthenticatedLayoutPetIdIndexRoute,
  AuthenticatedLayoutQuizIdIndexRoute: AuthenticatedLayoutQuizIdIndexRoute,
}

const AuthenticatedLayoutRouteWithChildren =
  AuthenticatedLayoutRoute._addFileChildren(AuthenticatedLayoutRouteChildren)

interface AuthenticatedRouteChildren {
  AuthenticatedLayoutRoute: typeof AuthenticatedLayoutRouteWithChildren
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedLayoutRoute: AuthenticatedLayoutRouteWithChildren,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/': typeof AuthenticatedLayoutIndexRoute
  '/chat': typeof AuthenticatedLayoutChatIndexRoute
  '/pet-request': typeof AuthenticatedLayoutPetRequestIndexRoute
  '/pet': typeof AuthenticatedLayoutPetIndexRoute
  '/quiz': typeof AuthenticatedLayoutQuizIndexRoute
  '/story': typeof AuthenticatedLayoutStoryIndexRoute
  '/answer/$id': typeof AuthenticatedLayoutAnswerIdIndexRoute
  '/pet/$id': typeof AuthenticatedLayoutPetIdIndexRoute
  '/quiz/$id': typeof AuthenticatedLayoutQuizIdIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/': typeof AuthenticatedLayoutIndexRoute
  '/chat': typeof AuthenticatedLayoutChatIndexRoute
  '/pet-request': typeof AuthenticatedLayoutPetRequestIndexRoute
  '/pet': typeof AuthenticatedLayoutPetIndexRoute
  '/quiz': typeof AuthenticatedLayoutQuizIndexRoute
  '/story': typeof AuthenticatedLayoutStoryIndexRoute
  '/answer/$id': typeof AuthenticatedLayoutAnswerIdIndexRoute
  '/pet/$id': typeof AuthenticatedLayoutPetIdIndexRoute
  '/quiz/$id': typeof AuthenticatedLayoutQuizIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/login': typeof LoginRoute
  '/_authenticated/_layout': typeof AuthenticatedLayoutRouteWithChildren
  '/_authenticated/_layout/': typeof AuthenticatedLayoutIndexRoute
  '/_authenticated/_layout/chat/': typeof AuthenticatedLayoutChatIndexRoute
  '/_authenticated/_layout/pet-request/': typeof AuthenticatedLayoutPetRequestIndexRoute
  '/_authenticated/_layout/pet/': typeof AuthenticatedLayoutPetIndexRoute
  '/_authenticated/_layout/quiz/': typeof AuthenticatedLayoutQuizIndexRoute
  '/_authenticated/_layout/story/': typeof AuthenticatedLayoutStoryIndexRoute
  '/_authenticated/_layout/answer/$id/': typeof AuthenticatedLayoutAnswerIdIndexRoute
  '/_authenticated/_layout/pet/$id/': typeof AuthenticatedLayoutPetIdIndexRoute
  '/_authenticated/_layout/quiz/$id/': typeof AuthenticatedLayoutQuizIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/'
    | '/chat'
    | '/pet-request'
    | '/pet'
    | '/quiz'
    | '/story'
    | '/answer/$id'
    | '/pet/$id'
    | '/quiz/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/login'
    | '/'
    | '/chat'
    | '/pet-request'
    | '/pet'
    | '/quiz'
    | '/story'
    | '/answer/$id'
    | '/pet/$id'
    | '/quiz/$id'
  id:
    | '__root__'
    | '/_authenticated'
    | '/login'
    | '/_authenticated/_layout'
    | '/_authenticated/_layout/'
    | '/_authenticated/_layout/chat/'
    | '/_authenticated/_layout/pet-request/'
    | '/_authenticated/_layout/pet/'
    | '/_authenticated/_layout/quiz/'
    | '/_authenticated/_layout/story/'
    | '/_authenticated/_layout/answer/$id/'
    | '/_authenticated/_layout/pet/$id/'
    | '/_authenticated/_layout/quiz/$id/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/login"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/_layout"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_authenticated/_layout": {
      "filePath": "_authenticated/_layout.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_layout/",
        "/_authenticated/_layout/chat/",
        "/_authenticated/_layout/pet-request/",
        "/_authenticated/_layout/pet/",
        "/_authenticated/_layout/quiz/",
        "/_authenticated/_layout/story/",
        "/_authenticated/_layout/answer/$id/",
        "/_authenticated/_layout/pet/$id/",
        "/_authenticated/_layout/quiz/$id/"
      ]
    },
    "/_authenticated/_layout/": {
      "filePath": "_authenticated/_layout/index.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/chat/": {
      "filePath": "_authenticated/_layout/chat/index.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/pet-request/": {
      "filePath": "_authenticated/_layout/pet-request/index.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/pet/": {
      "filePath": "_authenticated/_layout/pet/index.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/quiz/": {
      "filePath": "_authenticated/_layout/quiz/index.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/story/": {
      "filePath": "_authenticated/_layout/story/index.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/answer/$id/": {
      "filePath": "_authenticated/_layout/answer/$id/index.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/pet/$id/": {
      "filePath": "_authenticated/_layout/pet/$id/index.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/quiz/$id/": {
      "filePath": "_authenticated/_layout/quiz/$id/index.tsx",
      "parent": "/_authenticated/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
