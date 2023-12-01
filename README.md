# React Native & TypeScript - Routes & Permissions App

---

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección nos enfocaremos en trabajar todo lo relacionado a permisos como el GPS, cámara, photos o lo que se necesite, todo se hace la misma manera para cualquier permiso del dispositivo y para eso se creará un contexto que nos permita trabajar fácilmente cualquier permiso que se necesite en aplicaciones futuras.

En este proyecto puntualmente nos enfocaremos en todo el manejo del permiso de GPS para poder determinar su ubicación precisa y así poder generar un mapa en sus coordenadas. Aprenderemos a utilizar el GPS del dispositivo, darle seguimiento, trazar rutas, colocar marcadores y sobre todo, estar pendiente de los permisos del GPS. Utilizaremos Apple Maps y Google Maps, junto sus configuraciones respectivas e instalaciones.

    - Stack de navegación
    - Permisos para usar algún recursos del dispositivo (se está usando un paquete de terceros para hacerlo más estándar para IOS/Android a la vez y también crear algo que nos ayude a controlar todos los permisos de forma uniforme en el futuro. También se puede usar PermissionsAndroid que provee React Native en su core. )
    - Context API
    - Implementar mapas (zoom in y zoom out al mapa, rutas, seguimiento y polylines)

### \* PASOS A REALIZAR:

1. Al realizar la generación de la API Key en la consola de Google fue para tener también la facilidad de que si queremos trabajar Google Maps en iOS. La configuración de la aplicación con esas API Key entonces ya funciona en Android con Google Maps y en iOS con Apple Maps y no hay que hacer más configuración porque Apple Maps es la implementación de mapas de Apple y ese paquete de mapas nativo ya tiene cierta funcionalidad como polylines, marcadores y generealidades con lo que usualmente se va a trabajar pero hay ciertas funcionalidades que no se tienen y por eso se hará también la configuración de Google Maps para iOS.
2. Puede ser que salga un warning en la aplicación referido a `RequireCycle Warning` y si sale se hará lo siguiente:

   - respuesta de itsam y diwakarpawar: https://github.com/react-native-maps/react-native-maps/issues/3352
     - https://github.com/react-native-maps/react-native-maps/issues/3352#issuecomment-630168111
     - https://github.com/react-native-maps/react-native-maps/issues/3352#issuecomment-680933811 (al ejecutar el script dará un warning en la aplicación que es normal, hay que levnatar de nuevo la aplicación de Android y también iOS)

3. ejemplo

### \* RECURSOS A USAR:

- react-native-permissions: https://www.npmjs.com/package/react-native-permissions
  - `npm i react-native-permissions`
- react-native-maps: https://github.com/react-native-maps/react-native-maps / https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md
  - `npm install react-native-maps`
- ejemplo

---

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
