# globall66-technical-test

## Estrategia de Persistencia de Datos

Este proyecto implementa una estrategia inteligente de persistencia de datos usando Pinia store con las siguientes características clave:

### **Cache de Datos de Pokémon**
- **Cache en Memoria**: La información detallada de Pokémon se almacena en caché usando `Map<string, Pokemon>` para evitar llamadas redundantes a la API
- **Sin Re-carga**: Una vez que se cargan los detalles de un Pokémon, solicitudes posteriores usan datos en caché instantáneamente
- **Eficiente en Memoria**: El caché previene solicitudes de red innecesarias manteniendo el rendimiento

### **Sistema de Búsqueda Inteligente**
- **Búsqueda Híbrida**: Combina filtrado local con búsqueda por API para una experiencia de usuario óptima
- **Prioridad Local**: Primero busca dentro de los Pokémon ya cargados para resultados instantáneos
- **API como Respaldo**: Solo consulta la API cuando no encuentra coincidencias locales
- **Resultados Persistentes**: Los resultados de búsqueda se agregan a la lista principal sin sobrescribir datos existentes

### **Carga Incremental**
- **Sin Duplicados**: Nuevos Pokémon solo se agregan a la lista si no existen ya
- **Preservación de Estado**: Todos los favoritos y datos previamente cargados permanecen intactos
- **Crecimiento Continuo**: La lista de Pokémon crece incrementalmente sin pérdida de datos

### **Gestión Inteligente de Favoritos**
- **Propiedad Directa**: Usa la propiedad booleana `favorite` en cada objeto Pokémon en lugar de arrays separados
- **Estado Persistente**: El estado de favorito se mantiene durante operaciones de búsqueda y actualizaciones de lista
- **Actualizaciones Reactivas**: Los cambios en favoritos se reflejan inmediatamente en todas las vistas

### Beneficios de Implementación

- ✅ **Rendimiento Optimizado**: Reduce llamadas a la API y mejora tiempos de respuesta
- ✅ **UX Fluida**: Los usuarios nunca pierden sus datos durante navegación o búsqueda
- ✅ **Eficiente en Memoria**: El caché inteligente previene almacenamiento redundante de datos
- ✅ **Estado Reactivo**: Todos los componentes se mantienen sincronizados con cambios de datos
- ✅ **Arquitectura Escalable**: Soporta carga continua de datos sin memory leaks

## Tecnologias

Este es un proyecto Vue 3 construido con un stack tecnológico moderno que incluye:

- **Vue 3**: El framework progresivo de JavaScript para construir interfaces de usuario
- **Tailwind CSS**: Elegido por su enfoque utility-first, flexibilidad en el diseño y capacidades de desarrollo rápido
- **TypeScript**: Para una mejor seguridad de tipos y experiencia de desarrollo
- **Vite**: Para un desarrollo y construcción ultrarrápidos
- **Pinia**: La solución oficial de gestión de estado para Vue

## Configuración de IDE Recomendada

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y desactivar Vetur).

## Configuración del Navegador Recomendada

- Navegadores basados en Chromium (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Activar Custom Object Formatter en Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Activar Custom Object Formatter en Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Soporte de Tipos para Importaciones `.vue` en TS

TypeScript no puede manejar la información de tipos para importaciones `.vue` por defecto, por lo que reemplazamos el CLI `tsc` con `vue-tsc` para la verificación de tipos. En los editores, necesitamos [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para que el servicio de lenguaje TypeScript reconozca los tipos `.vue`.

## Configuración del Proyecto

```sh
pnpm install
```

### Compilar y Recargar en Desarrollo

```sh
pnpm dev
```

### Verificar Tipos, Compilar y Minificar para Producción

```sh
pnpm build
```

### Ejecutar Pruebas Unitarias con Vitest

```sh
pnpm test:unit
```

### Linting con ESLint

```sh
pnpm lint
```
