# BRÚJULA – Frontend React

Versión React de la agencia de viajes **BRÚJULA**, desarrollada para el segundo parcial y el final de Taller de Desarrollo Web.

## Autoras

- Lucía Rucci - 2418308
- Isabela Acuña - 2405404

## Funcionalidades

- Navegación con React Router y `Outlet`.
- Catálogo leído desde un JSON local.
- Búsqueda, filtros por precio y categoría, y orden alfabético.
- Modal con galería y cálculo de reserva.
- Itinerario compartido mediante Context API y guardado en `localStorage`.
- Formulario con validación accesible en tiempo real.
- Diseño responsive equivalente a la primera entrega.

## Tecnologías

- React 19
- Vite
- React Router DOM
- SASS
- Jest
- React Testing Library

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/components` | Header, Footer, Button, Input, cards, modal y contexto |
| `src/pages` | Inicio, Destinos, Itinerario y Contacto |
| `src/data` | Información local de los destinos |
| `src/styles` | Variables, estilos generales y estilos por página |
| `src/tests` | Pruebas de componentes reutilizables |
| `public/imagenes` | Imágenes y video del sitio |

## Instalación

```bash
npm install
npm run dev
```

## Verificación

```bash
npm run lint
npm test
npm run build
```

El proyecto incluye 7 tests con Jest y React Testing Library. La compilación utiliza rutas relativas y `HashRouter` para funcionar correctamente en GitHub Pages.

## Requisitos cumplidos

- [x] Vite y React.
- [x] `useState`, `useEffect`, `useContext` y `useNavigate`.
- [x] React Router DOM y `Outlet`.
- [x] Imports mediante alias.
- [x] Componentes reutilizables en distintas páginas.
- [x] Validación en tiempo real con mensajes accesibles.
- [x] JSON local y renderizado dinámico.
- [x] Persistencia en `localStorage`.
- [x] Diseño responsive.
- [x] Al menos 5 tests con Jest y React Testing Library.
