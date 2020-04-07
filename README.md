<h1>Preparando o ambiente</h1>

- como preparar o ambiente:

- [Ambiente React Native](https://docs.rocketseat.dev/ambiente-react-native/introducao)

- Para mac OS instalar o cocoapods:

- [CocoaPods](https://cocoapods.org)

- Adicionar o react-native-cli:

- [React Native CLI](https://github.com/react-native-community/cli)

- Adicionar de forma global:

```bash
yarn add react-native-cli
```

---

<h2>Iniciar o projeto</h2>

- Executar o seguinte comando:

```bash
react-native init NOME_DO_APP
```

---

<h2>Executar o projeto</h2>

- Para android:
**O Emulador deve estar aberto**
- Executar o comando:

```bash
react-native run-android
```

- Para IOS:

```bash
react-native run-ios
```
- Após irá abrir um outro terminal, caso acidentalmente feche esse terminal, ou quando for executar o projeto novamente, só abrir o emulador onde a aplicação está instalada e executar o comando:

```bash
react-native start
```

----

<h2>Refresh</h2>

- Funções especiais:

- command + D, abre o menu

- command + R, dá refresh

- Para ativar o fast refresh que irá atualizar sempre que houver alguma atualização:

- command + D, abre o menu, e seleciona o Enable Fast Refresh, caso esteja desabilitado.


---

<h2>ESLint, Prettier, Editor Config</h2>

- Gerar o arquivo editorconfig:

```js
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

```

- Antes de instalar o eslint, remova o arquivo `.eslintrc.js`

- Executar no terminal:

```bash
yarn add eslint -D
```

- Após instalado executar:

```bash
yarn eslint --init
```

- Responder as perguntas:

- How would you like to use ESLint?

- To check syntax, find problems, and enforce code style

- What type of modules does your project use?

- JavaScript modules (import/export)

- Which framework does your project use?

- React

- Where does your code run?

**Remover todos**

- How would you like to define a style for your project?

- Use a popular style guide

- Which style guide do you want to follow?

- Airbnb: https://github.com/airbnb/javascript

- What format do you want your config file to be in?

- JavaScript

- Would you like to install them now with npm?

- Y

- Remover o arquivo package-look.json

- Executar o comando `yarn`

- Instalar mais algumas extensões para trabalhar com o ESLint:

- Executar o seguinte no terminal:

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
```

- No arquivo `.eslintrc.js` alterar o conteúdo para:

```js
module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', 'js']
      }
    ],
    'import/prefer-default-export': 'off'
  },
};

```

**Nos arquivos a parte dos styles sempre é melhor vir antes que o component**

- Criar o arquivo `.prettierrc` com o seguinte conteudo:

```js
{
  "singleQuote": true,
  "trailingComma": "es5"
}

```

- Provavelmente após todos esse processos irá aparecer um monte de erros na tela do dispositivo, para corrigir, encerre o processo no terminal e execute o comando:

```bash
react-native start --reset-cache
```

- Dessa forma irá abrir o bundle porém irá resetar as dependencias

- E sempre que houver problemas sem explicação só executar esse comando ou executar o `react-native run-PLATAFORMA`

---

<h2>Reactotron<h2>

- Para utilizar como debug:

- [reactotron](https://github.com/infinitered/reactotron)

- Ir em `Quick start for React Native` [React Native](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md)

- Realizar o download da versão que não seja beta:

[Release](https://github.com/infinitered/reactotron/releases)

- Para mac pode utilizar o dmg

- No projeto adicionar a dependencia:

```bash
yarn add reactotron-react-native
```

---
<h2>Organizar estrutura de pastas</h2>

- Criar a pasta `src` e adicionar um arquivo `index.js` e adicionar o código que está no `App.js` e remover o arquivo `App.js` e no arquivo `index.js` que está na raiz importar o `App` de `src/index.js`:

```js
import App from './src';
```

- Criar o arquivo `src/config/ReactotronConfig.js` com o seguinte conteudo:


```js
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure().useReactNative().connect();

  console.tron = tron;

  // toda vez que dermos um refresh na aplicação será limpo o console
  tron.clear();
}
```

- No arquivo `.eslintrc.js` adicionar a variavel global `__DEV__` como readonly.

- No arquivo `src/index.js` adicionar o import:

```js
import './config/ReactotronConfig';
```

**Problemas**

- Caso for Android em USB, pode ser necessário executar o seguinte comando:

```bash
adb reverse tcp:9090 tcp:9090
```

- Em alguns caso pode ser necessário no arquivo `ReactotronConfig.js` fazer o seguinte:

```js
const tron = Reactotron.configure({host: 'IP_DA_MAQUINA'}).useReactNative().connect();
```

- Quando precisarmos executar o log podemos utilizar o comando:

```js
console.tron.log();
console.tron.warn();
```

---

Navegação

No React Native a parte de navegação é diferente da parte de navegação do React da web

- Criar as paginas: `src/pages/Main/index.js` e `src/pages/User/index.js`

- Criar o arquivo para rotas `src/routes.js`

- Instalar a navegação:

```bash
yarn add @react-navigation/native
```

- A dependencia do react-navigation muda constantemente por isso é sempre bom dar uma conferida na documentação para verificar as dependencias a serem instaladas.

- [React Navigation](https://reactnavigation.org/docs/getting-started)

- é bom verificar o que ele pede, no caso nesse projeto foi instalado também:

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

- E depois precisei acessar a pasta `ios/` e executar o comando:

```bash
pod install
```

- Para surtir efeitos nessas alterações é necessário executar novamente o comando:

```bash
react-native run-PLATAFORMA
```

- Instalar a seguinte dependencia conforme [stack navigator](https://reactnavigation.org/docs/hello-react-navigation):

```bash
yarn add @react-navigation/stack
```

- No arquivo `src/routes.js` há um exemplo de como foi utilizado o `Stack Navigator` seguindo algumas opções de [createStackNavigator](https://reactnavigation.org/docs/stack-navigator#example)

**Importante: Para não quebrar a aplicação em produção é necessário adicionar a importação no arquivo de rotas:**

```js
import 'react-native-gesture-handler';
```

---

<h2>Alterar Status Bar</h2>

- Para tal importar no arquivo princial no caso do projeto `src/index.js` e adicionar:

```js
import { StatusBar } from 'react-native';
```

- e utilizar da seguinte forma:

```js
return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
```

- Basicamente o prop `backgroundColor` é utilizado para android, para alterar a cor da status bar.

---

<h2>Styled Components</h2>

- Instalação:

```bash
yarn add styled-components
```

- Um exemplo pode ser visto em `src/pages/Main/styles.js`

- No caso só pode ser utilizado components do Native, e ainda é necessário estilizar component por component não pode ser encadeado.

- A vantagem é que consigo utilizar o css normal como na web.
