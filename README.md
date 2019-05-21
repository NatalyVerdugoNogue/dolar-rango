# Dolar Rango

Este proyecto se conecta a la SBIF para mostrar el precio del dolar en rango de fechas.

### Antes de empezar correr el proyecto localmente

Se debe configurar la API Key que proporciona el SBIF, para solicitar una puede hacerlo ingresando al siguiente [link](https://api.sbif.cl/uso-de-api-key.html)

Luego se ha de crear un archivo llamado `environment.js` dentro de la carpeta `src` con la siguiete estructura

```js
export const development = {
  API_KEY: 'SBIF_API_KEY'
};

export const production = {
  API_KEY: 'SBIF_API_KEY'
};

export default development;
```

### `npm start`

Corre el proyecto en modo desarrollo.<br>
Hace click en [http://localhost:3000](http://localhost:3000) para ver el proyecto en el navegador.
