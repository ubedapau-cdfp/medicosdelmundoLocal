## Estructura de carpetas del SCSS/CSS

```
scss/
├── styles.scss              -> compila a css/styles.css
├── stylesalternativa.scss   -> compila a css/stylesalternativa.css
├── abstracts/               variables y mixins (no generan CSS)
│   ├── _index.scss
│   ├── _variables.scss
│   └── _mixins.scss
├── base/                    estilos generales
│   ├── _root.scss           colores del tema claro (variables CSS)
│   └── _base.scss           body, h1, p, img...
├── layout/                  estructura de la página
│   ├── _sidenav.scss
│   ├── _main.scss
│   └── _responsive.scss     tablet y móvil (siempre el último)
├── components/              piezas reutilizables
│   ├── _buttons.scss
│   ├── _dropdown.scss
│   ├── _forms.scss
│   ├── _password-toggle.scss
│   ├── _alert.scss
│   ├── _translator.scss
│   ├── _open-nav-button.scss
│   └── _theme-toggle.scss
├── pages/                   estilos de cada página
│   ├── _home.scss
│   ├── _login.scss
│   ├── _apartados.scss
│   ├── _sobrenosotras.scss
│   ├── _subapartados.scss
│   └── _faqs.scss
└── themes/
    └── _dark.scss           tema oscuro (data-theme="alt")
css/                         CSS ya compilado
