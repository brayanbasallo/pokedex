# globall66-technical-test

[English](#english) | [Español](#español)

# English

This is a Vue 3 project built with a modern tech stack that includes:

- **Vue 3**: The progressive JavaScript framework for building user interfaces
- **Tailwind CSS**: Chosen for its utility-first approach, flexibility in design, and rapid development capabilities
- **TypeScript**: For enhanced type safety and developer experience
- **Vite**: For lightning-fast development and build tooling
- **Pinia**: Vue's official state management solution

# Español

Este es un proyecto Vue 3 construido con un stack tecnológico moderno que incluye:

- **Vue 3**: El framework progresivo de JavaScript para construir interfaces de usuario
- **Tailwind CSS**: Elegido por su enfoque utility-first, flexibilidad en el diseño y capacidades de desarrollo rápido
- **TypeScript**: Para una mejor seguridad de tipos y experiencia de desarrollo
- **Vite**: Para un desarrollo y construcción ultrarrápidos
- **Pinia**: La solución oficial de gestión de estado para Vue

## Recommended IDE Setup | Configuración de IDE Recomendada

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y desactivar Vetur).

## Recommended Browser Setup | Configuración del Navegador Recomendada

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS | Soporte de Tipos para Importaciones `.vue` en TS

TypeScript no puede manejar la información de tipos para importaciones `.vue` por defecto, por lo que reemplazamos el CLI `tsc` con `vue-tsc` para la verificación de tipos. En los editores, necesitamos [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para que el servicio de lenguaje TypeScript reconozca los tipos `.vue`.

## Customize configuration | Personalizar configuración

Consulta la [Referencia de Configuración de Vite](https://vite.dev/config/).

## Project Setup | Configuración del Proyecto

```sh
pnpm install
```

### Compile and Hot-Reload for Development | Compilar y Recargar en Desarrollo

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production | Verificar Tipos, Compilar y Minificar para Producción

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/) | Ejecutar Pruebas Unitarias con Vitest

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/) | Linting con ESLint

```sh
pnpm lint
```
