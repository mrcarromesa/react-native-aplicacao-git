<h1>Aplicação Git</h1>

- Primeiro trabalhar na parte de estilização, do arquivo `src/pages/Main/index.js`

- Instalar a dependencia:

```bash
yarn add react-native-vector-icons
```

**Para IOS**

- Para funcionar no IOS é necessário realizar alguns passos a mais:

- ir na documentação da lib [Vector Icons](https://github.com/oblador/react-native-vector-icons)

- ir em Instalations > iOS [iOS](https://github.com/oblador/react-native-vector-icons#ios)

- Procurar por "List of all available fonts to copy & paste in info.plist" haverá algo como isso:

```xml
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
</array>
```

- No projeto localizar a pasta `ios/NOME_DO_PROJETO/info.plist` antes da tag `</dict>`, e escolher as fontes que irá utilizar e descartar as outras.

- Depois acessar a pasta `ios/` e executar o comando:

```bash
pod install
```

- E para efetivar as alterações executar o comando:

```
react-native run-ios
```

**/Para IOS**

---

**Para android**

- Acessar na documentação [Android](https://github.com/oblador/react-native-vector-icons#android)

- Acessar o arquivo `android/app/build.gradle` adicionar o seguinte no final do arquivo:

```js
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

- em `iconFontNames` inserir as fontes que serão utilizadas.

e por fim executar o comando:

```bash
react-native run-android
```

**/Para android**

- Para utilizar os icones importar no arquivo o seguinte:

```js
import Icon from 'react-native-vector-icons/MaterialIcons';
```

- Para saber qual icone utilizar, veja a documentação:

[react-native-vector-icons directory](https://oblador.github.io/react-native-vector-icons/)

- Exemplo de com utilizar em `src/pages/Main/index.js`

- No arquivo `src/pages/Main/styles` será utilizado um outro component no lugar do botão padrão, o qual tem um efeito de ripple:

```js
import { RectButton } from 'react-native-gesture-handler';
```

- E para estilização utilizamos:

```js
export const SubmitButton = styled(RectButton)``;
```


---

<h2>TextInput</h2>

- Alterar label do tecla enter do teclado:

```js
<TextInput
  returnKeyType="OPCAO_AQUI"
/>
```

- Alterar action da tecla enter do teclado:

```js
<TextInput
  onSubmitEditing={() => {}}
>
```

---

<h2>Axios</h2>

- Chamadas a API, pode ser utilizada a mesma da web:

```bash
yarn add axios
```

- Criara o arquivo `src/sevices/api.js` e adicionar o código:

```js
import axios from 'axios';


export default api = axios.create({
  baseUrl: 'https://api.github.com'
});
```

- importa a api na pagina `Main`:

```js
import api from '../../services/api';
```

---

<h2>Ocultar teclado</h2>

- Import `Keyboard` de `react-native`:

```js
import { Keyboard } from 'react-native';
```

- Chame a function:

```js
Keyboard.dismiss();
```


---

<h2>Criando Listagem de usuários</h2>

No React Native diferente da web, não consigo trabalhar com `ul li`, e nem utilizar o `map` para listas, pois o react-native tem formas próprias para trabalhar com listas pois já insere o comonente de scroll.

- Iniialmente iremos inserir o component `FlatList`

- Esse componente aceita alguns parametros:

```js
<FlatList
  data={dataArray}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View>
      <Text>{item.nome}</Text>
    </View>
  )}
/>
```

Propriedades do FlatList
- `data`: Informar o array, será os dados que serão listados;
- `keyExtractor`: é o mesmo que a propriedade `key` na web, que precisa ser unico dentro de um loop; ele recebe uma função, que irá pegar cada item dos dados informados na propriedade `data`, irá pecorrer e eu preciso informar o item que é unico nesses dados.
- `renderItem`: Recebe uma function que será inserido conteúdo JSX, dentro dessa function posso desestruturar e passar o elemento item que será o item a ser interado.

- Adicionando url ao componente imagem:

```js
<Image source={{uri: 'http://...'}} />
```

- Para eu inserir uma url para `Image` preciso seguir conforme o exemplo acima.

---

<h2>Help sobre estilização</h2>

- O `text-align: center;` é necessário mesmo com `align-items: center`, pois o align-items só altera o component em si, o text-align, trabalha diretamente o texto.

- Para o component `Text` podemos utilizar uma propriedade chamada: `numberOfLines: 2` que só permite ser exibido no máximo X linhas e insere automáticamente `...`, no final:

- Ex. Utilizando styled-components/native

```js
export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;
```

- Estilizar o placeholder de um TextEdit com `styled-components/native`:

```js
export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;
```

- Estilizando um `ScrolView` com styled-components/native:

```js
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
```

- Verifique que utilizamos `attrs({})` para estilziar propriedades especiais, que não são inseridas no css, mas sim propriedades do próprio component.

- Adicionando `props` em um style:

- Ex., Temos o component: `<SubmitButton loading={loading}>`

- No Styled components adicionamos:

```js
opacity: ${(props) => (props.lading ? 0.7 : 1)};
```

---

<h2>Adicionando Loading</h2>

- Importar `ActivityIndicator` do `react-native`:

```js
import { ActivityIndicator } from 'react-native';
```

- Criar uma variavel do state que inicia como false:

```js
const [loading, setLoading] = useState(false);
```

- Antes de executar a chamada a API, seta como true, e depois como false:

```js
setLoading(true);

//...
// Chamada api

setLoading(false);
```
----

<h2>Storage</h2>

No react native não possuí o localstorage como na web.

Então instalamos a dependencia:

```bash
yarn add @react-native-community/async-storage
```

- Para funcionar no iOS precisa acessar a pasta `ios/` e executar `pod install`

- Importar na página que desea salvar os dados:

```js
import AsyncStorage from '@react-native-community/async-storage';
```

- O AsyncStorage funciona da mesma que o localstorage, porém de forma assincrona. Dessa forma é necessário utilizar o `await`.

- Para utilizar vamos adicionar o `useEffect`:

```js
// Ao iniciar
useEffect(() => {
  async function getStorage() {
    const userStorage = await AsyncStorage.getItem('users');
    if (userStorage && userStorage !== 'null') {
      setUsers(JSON.parse(userStorage));
    }
  }

  getStorage();
}, []);

// Quando houver alteração
useEffect(() => {
  AsyncStorage.setItem('users', JSON.stringify(users));
}, [users]);
```

---

<h2>Enviar informações de uma tela para outra</h2>

- Na Página 1 adicionar o import:

```js
import { useNavigation } from '@react-navigation/native';
```

- Dentro de component adicionar:

```js
const navigation = useNavigation();
```


- Dentro de uma function como o onPress adicionar o seguinte:

```js
navigation.navigate('User', { user: userItem });
```

- Como funciona:

```js
navigation.navigate('NOME_DA_ROTA_DEFINIDA_NO_ARQUIVO_DE_ROTAS', { OBJECT_JAVASCRIPT_PARA_ENVIAR_A_OUTRA_TELA });
```

- Receber o parametro... Na Página 2 adicionar o import:

```js
import { useRoute } from '@react-navigation/native';
```

- Dentro do component adicionar o seguinte:

```js
const route = useRoute();
const { user } = route.params;
```
- Ali onde estar o `{ user }` colocar o nome do parametro que foi passado pela tela 1

---


<h2>Alterar opções do Top bar</h2>

- Importar o seguinte:

```js
import { useNavigation } from '@react-navigation/native';
```

- Dentro do component adicionar:

```js
const navigation = useNavigation();
```

- Exemplo de como utilizar:

```js
navigation.setOptions({
  title: user.name,
  // headerShown: false,
});
```


---

<h2>Root Import</h2>

- Facilita a importação dos arquivos que estão dentro de várias pastas, ao ínves de utilizar `../../../pasta/arquivo` ficará assim `~/pasta/arquivo`;

- Primeiro adicione a dependencia:

```bash
yarn add babel-plugin-root-import eslint-import-resolver-babel-plugin-root-import -D
```

- Ajustar o arquivo `babel.config.js` com o seguinte conteúdo:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/',
            rootPathPrefix: '~/',
          },
        ],
      },
    ],
  ],
};


```

- Na chave `rootPathSuffix` informamos a pasta que será utilizada no caso `./src/`

- No arquivo `.eslintrc.js` adicionamos o seguinte dentro de `modules.exports`:

```js
settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        "rootPathPrefix": "~",
        "rootPathSuffix": "src"
      }
    }
  }
```

- Estamos dessa forma informando que a pasta root do projeto será `src`

- Crie também na raiz do projeto um arquivo `jsconfig.json` para o vscode não se perder nas importações com o seguinte conteúdo:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}

```

- Agora poderá utilizar `~/` ao invés de `../../`

- Para surtir efeito no app é necessário realizar a seguinte comando:

```bash
react-native start --reset-cache
```

- Pois nem sempre fechando o emulador e e dando run irá funcionar


---

<h2>Realização de Testes</h2>

---

[Testing](https://reactnative.dev/docs/testing-overview)

<h3>Configurando o ambiente</h3>

- Instalar a dependencia:

```bash
yarn add @testing-library/react-native -D
```

- Também o intelesence:

```bash
yarn add @types/jest -D
```

- Lembre de criar na raiz do projeto o arquivo `jsconfig.json`, para o vs code não se perder com o babel root import, com o seguinte conteúdo:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}

```

---
**Em geral utilizo o `react-native-gesture-handler` que é utilizado juntamento com o módulo de navegação Então preciso criar o mock para o useNavigation**:

- Crie a pasta na raiz do projeto `__mocks__/` e adicione o arquivo `useNavigation.setup.js`:

```js
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => {
    return () => {};
  }),
}));

```

**Em geral utilizo o `@react-native-community/async-storage` que é utilizado como o localstorage porém para mobile, também preciso realizar o mock para ele**:

- Adicione a pasta `__mocks__/` que deverá estar na raiz do projeto, caso não exista crie ela, adicione o arquivo `async.storage.setup.js` e adicione o seguinte:

```js
global.dataAsyncStorage = {};

jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn((key, value) => {
    return new Promise((resolve) => {
      global.dataAsyncStorage[key] = value;
      resolve(null);
    });
  }),
  getItem: jest.fn((key) => {
    return new Promise((resolve) => {
      resolve(global.dataAsyncStorage[key]);
    });
  }),
  removeItem: jest.fn((key) => {
    return new Promise((resolve) => {
      delete global.dataAsyncStorage[key];
      resolve(null);
    });
  }),
}));
```

- Criar na raiz do projeto o arquivo `jest.config.js` com as seguintes configurações:

```js
module.exports = {
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      '|react-native-vector-icons' +
      '|react-native-gesture-handler' +
      '|@react-native-community' +
      '|@react-navigation' +
      '|@react-navigation/stack' +
      '|react-native-iphone-x-helper' +
      ')/)',
  ],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './__mocks__/useNavigation.setup.js',
    './__mocks__/async.storage.setup.js',
  ],
  collectCoverageFrom: [
    'src/pages/**',
    '!src/pages/**/styles.js',
    '!src/services/api.js',
    '!src/config/ReactotronConfig.js',
  ],
  coverageDirectory: '__tests__/coverage',
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.js'],
};

```

---
<h2> Realizando Testes</h2>

- Import o `react` e também import o:

```js
import { render, fireEvent } from '@testing-library/react-native';
```

- Utilização do fireEvent para o TextInput para o `onChange`:

```js
const { getByText, getByTestId } = render(<Component />);
fireEvent.changeText(getByTestId('id'), 'Texto que será inserido');
```

- Utilização do fireEvent para o Button `onPress`:

```js
fireEvent.press(getByTestId('id'));
```


- No elemento do component podemos utilizar o id `testID`:

```js
<Text testID="id">Texto</Text>
```


---

<h2>Lib para trabalhar de forma semelhante com o jest-dom do reactjs</h2>

É muito útil para obter os atributos dos elementos:

[jest-native](https://github.com/testing-library/jest-native)

- Instale:

```bash
yarn add @testing-library/jest-native -D
```

- Como iremos utilizar em vários arquivos essa lib adicionamos no `jest.config.js`:

```js
setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
```


---

<h2>Mock RectButton</h2>

- O `RectButton` não funciona o fireEvent `press`, para isso resolvi realizando o `mock` Transformando ele em um Button:

```js
// https://github.com/testing-library/native-testing-library/issues/113#issuecomment-607796505
jest.mock('react-native-gesture-handler', () => ({
  RectButton: (props) => {
    const { Button } = require('react-native');
    return <Button {...props} />;
  },
}));
```

- Mais detalhes [Resolve](https://github.com/testing-library/native-testing-library/issues/113#issuecomment-607796505)

---

<h2>Mock AsyncStorage com Teste Async</h2>

- Essa parte parece um tanto complexa, como envolve atualização do useState e consequentemente de um component que sofre renderização após alteração do useState e de forma asyncrona, o jest/react reclama que precisa que ao atualizar um componente utilize o `act(() => {})` do `react-dom/test-utils`, porém não estou mexendo com dom, estamos no react-native afinal, para resolver isso utilizei o seguinte conforme codigo em `__tests__/pages/Main.test.js`, segue trecho:

```js
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react-native';
// Antes de continuar configure o mock do AsyncStorage, nos passos acima.
import AsyncStorage from '@react-native-community/async-storage'; // Importei para simular uma informação já preenchida ao acessar a tela.
import Main from '~/pages/Main';

jest.useFakeTimers(); // Forçar aguardar processos assincronos

beforeEach(() => {
  cleanup();
});

// Transformar RectButton em Button, já visto antes
jest.mock('react-native-gesture-handler', () => ({
  RectButton: (props) => {
    const { Button } = require('react-native');
    return <Button {...props} />;
  },
}));

describe('Main', () => {

// Para utilizar o await precisamos informar que a function executa de forma async
it('shoud be able save async storage', async () => {

    // dados fake
    const data = [{
      login: 'gitlogin',
      avatar: 'https://avatar',
      name: 'Git Name',
      bio: 'Git Bio ...',
    }];
    await AsyncStorage.setItem('users', JSON.stringify(data));

    // Após inserir o dado fake renderizo o component
    const { getByText, getByTestId, debug, unmount } = render(<Main />);

    // PULO DO GATO
    // como é um evento async e o react precisa de um tempo para atualizar o useState, utilizamos
    // esse recurso process.nextTick(() => {})
    await wait(() => {
      process.nextTick(() => {
        // Inserir o expect() aqui
        debug();
        // expect().toBe();
      });
    });
  });
});
```

- Me basiei em [Github](https://github.com/facebook/react/issues/14769#issuecomment-461896777)

- As principais informações/comandos estão comentas no trecho de código acima.


---

<h2>Mock Axios API chamando a partir do button onPress Async</h2>

- Primeiro vamos instalar uma dependencia para ajudar nessa tarefa:

```bash
yarn add axios-mock-adapter
```

- Mais detalhes no arquivo `__tests__/pages/Main.test.js` no seguinte trecho:

```js
import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MockAdapter from 'axios-mock-adapter'; // Importar dependencia
import api from '~/services/api'; // Importar mesmo script utilizado pelo componente
import Main from '~/pages/Main';

const apiMock = new MockAdapter(api); // Realizando o mock

jest.useFakeTimers(); // Forçar aguardar processos assincronos

beforeEach(() => {
  cleanup();
});

// Transformar RectButton em Button, já visto antes
jest.mock('react-native-gesture-handler', () => ({
  RectButton: (props) => {
    const { Button } = require('react-native');
    return <Button {...props} />;
  },
}));

describe('Main', () => {
  // Processo async
  it('shoud be able to add new user git', async () => {
    // render do component
    const { getByText, getByTestId, debug, unmount } = render(<Main />);

    // Usuário quer será enviado
    fireEvent.changeText(getByTestId('main-input-add-user'), 'gitlogin');
    // Botão pressionado
    fireEvent.press(getByTestId('main-button-add-user'));

    // captura chamada get feitas para url 'users/id' com o status e a resposta
    apiMock.onGet('users/gitlogin').reply(200, {
      login: 'gitlogin',
      avatar: 'https://avatar',
      name: 'Git Name',
      bio: 'Git Bio ...',
    });

    // PULO DO GATO
    // Apos processo async faz testes:
    await wait(() => {
      process.nextTick(() => {
        debug();
        expect(getByTestId('main-input-add-user')).toHaveProp('value', '');
        expect(getByTestId('main-button-add-user')).toHaveProp('loading', false);
      });
    });
  });
});
```

---

<h2>Mock useNavigation</h2>

- Para utilizar o useNavigation é necessário realizar o mock da function.

```js
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

describe('Main', () => {
  it('shoud be able to add new user git', async () => {
    const navigation = {};
    navigation.navigate = jest.fn();

    useNavigation.mockReturnValue(navigation);

    console.log(navigation.navigate.mock.calls);
    expect(navigation.navigate).toHaveBeenCalled();

  });
});
```

---

<h2>Formik e Yup</h2>

- Primeiro instale as dependencias:

```bash
yarn add yup
```

- e:

```bash
yarn add formik
```

- Para utilizar só dá uma olhada no arquivo `src/pages/Main/index.js`.

- Nos testes basicamente não muda nada.

---

<h2>Mock Chamada ao Alert do react-native</h2>

- Nessa parte iremos realizar o mock da chamada do mock do `Alert.alert`, mais detalhes no arquivo `__tests__/pages/Main.test.js`, segue o trecho:

```js
import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react-native';
import { Alert } from 'react-native'; // Esse será o módulo que sofrerá o mock.
import AsyncStorage from '@react-native-community/async-storage';
import MockAdapter from 'axios-mock-adapter';
import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';
import Main from '~/pages/Main';


describe('Main', () => {
  it('should alert error', async () => {
    // Realizamos o mock aqui.
    Alert.alert = jest.fn().mockReturnValue('OK');

    const user = 'gitlogin';
    const { getByText, getByTestId, debug, unmount } = render(<Main />);
    fireEvent.changeText(getByTestId('main-input-add-user'), user);

    fireEvent.press(getByTestId('main-button-add-user'));

    apiMock.onGet(`users/${user}`).reply(500);

    await wait(() => {
      process.nextTick(() => {
        // verificamos se é chamado.
        expect(Alert.alert).toHaveBeenCalled();
      });
    });
  });
});
```

- Mais detalhes: [How to mock specific module function in jest?](https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4)


---

<h2>CodePush</h2>
- Servirá para conseguir atuailizar a aplicação já estiver em produção e em ambiente de staging, sem precisare enviar uma nova versão para loja de aplicativos.

- Isso é uma vantagem do React Native sobre outras liguagens de desenvolvimento de aplicativos, pois o código que ele utiliza por tras é um código javascript, e esse código javascript através do metodo blunder do React Native é convertido no final das contas para um arquivo único JS, que contem todo o código da aplicação na parte de JS, então quando for feita alguma alteração na aplicação que muda apenas código JS e não instala nenhuma dependencia nativa que precise fazer o link por exemplo. Podemos enviar esse código JS, quando o usuário abre o aplicativo ele realiza o download da nova versão automáticamente do codepush e instala de forma automática, dessa forma o usuário não precisa abrir a loja de aplicativos e baixar uma nova versão, e para o desesnvolvedor que não precisa enviar a aplicação para loja e esperar até ser aprovado pela loja e atualizado nos usuários.

- Instruções de como instalar o code push para o react native: [React Native Module for CodePush](https://github.com/Microsoft/react-native-code-push)

- Instalação configuração:

- Execute no terminal na pasta raiz do projeto o seguinte comando:

```bash
yarn add react-native-code-push
```

### old Será removido
- Para adicionar o modulo tanto para android e para ios execute o comando:

```bash
yarn react-native link react-native-code-push
```

- Provavelmente será perguntado de deployment key para Android e IOS, só dá Enter,
será ignorado por enquanto, depois serão adicionadas.

### /old Será removido

- Parte de configuração, no arquivo `src/index.js` vamos inserir alguns códigos:

- Import o code-push

```js
import CodePush from 'react-native-code-push';
```

- No `export default App` no final do arquivo altere para isso:

```js
export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
```

- A `CheckFrequency` tem pelo menos 3 opções: `ON_APP_RESUME`, `ON_APP_START`, `MANUAL`

- `MANUAL` É interessante pois nós mesmo podemos escolher quando efetivar as atualizações, no caso criar uma tela para atualização.

- `ON_APP_RESUME`, caso o usuário estiver utilizando o app, a atulização identifica isso e só procede com a atualização quando o app entrar em background

- `ON_APP_START` o app irá reiniciar ou voltar para tela inicial assim que a atualização for concluída.

----

<h2>Deploy</h2>

- Usaremos o [App Center](https://appcenter.ms/)

- Adicione um novo app primeiro para Android plataforma React Native

- No adicione de forma global o  `appcenter-cli`:

```bash
yarn global add appcenter-cli
```

- Após instalar rodar o seguinte comando:

```bash
appcenter login
```

- Irá abrir uma página no browser, só copiar o código e colar no terminal onde pede

- Para listar os apps já criados no appcenter execute o seguinte no terminal:

```bash
appcenter apps list
```

- É importante criar um outro ambiente que fica entre o debug e o release, o que será chamado de stage,
que serve para equipe de desenvolvimento testar a aplicação antes de ir definitivamente para produção.

- Primeiro

- No appcenter no aplicativo que foi criado lá, no menu a esquerda, vá em `Distribute > CodePush` aperte no botão `Create standard deployments`

- Executar o seguinte comando:

```bash
appcenter codepush deployment list -a ORGANIZACAO/NOME_DO_APP -k
```

- Suponde que tenha essa url: https://appcenter.ms/users/my_user/apps/my-app

- A ORGANIZACAO será `my_user`
- O NOME_DO_APP  será `my-app`

- o `-k` é para listar as chaves

- Será gerado uma chave para Staging e um para production, essas são as chaves que o codepush irá utilizar para ele conseguir enviar o código para aplicação sem precisar enviar para lojas de aplicativos.

- **Android**
1. No arquivo `android/settings.gradle`:

- alterei/adicionei isso:

```gradle
  include ':app', ':react-native-code-push'
  project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
```

- O meu arquivo estava assim:

```gradle
rootProject.name = 'modulo06'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'
```

- E agora com as alterações ficou assim:

```gradle
rootProject.name = 'modulo06'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app', ':react-native-code-push'
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
```

2. No arquivo `android/app/build.gradle` localize a linha não comentada `apply from: "../../node_modules/react-native/react.gradle"` e abaixo adicione:

```gradle
  apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
```

3. Update the `MainApplication.java` file to use CodePush via the following changes:

```java
...
// 1. Import the plugin class.
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        ...

        // 2. Override the getJSBundleFile method in order to let
        // the CodePush runtime determine where to get the JS
        // bundle location from on each app start
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
    };
}
```

4 - Abra o arquivo `android/app/build.gradle`, Encontre a seção `android { buildTypes {} }` e realize as alterações:

```groovy
android {
    ...
    buildTypes {
        debug {
            ...
            // Note: CodePush updates should not be tested in Debug mode as they are overriden by the RN packager. However, because CodePush checks for updates in all modes, we must supply a key.
            resValue "string", "CodePushDeploymentKey", '""'
            ...
        }

        releaseStaging {
            ...
            resValue "string", "CodePushDeploymentKey", '"<INSERT_STAGING_KEY>"'

            // Note: It is a good idea to provide matchingFallbacks for the new buildType you create to prevent build issues
            // Add the following line if not already there
            matchingFallbacks = ['release']
            ...
        }

        release {
            ...
            resValue "string", "CodePushDeploymentKey", '"<INSERT_PRODUCTION_KEY>"'
            ...
        }
    }
    ...
}
```

- No `debug` a parte onde está `'""'` é para informar que será um string vazia.
- No `matchingFallbacks` informa que no caso de não encontrar nenhuma configuração necessário, procurar dentro do informado.

- Dentro do release comentei essa linha `signingConfig signingConfigs.debug`

*IMPORTANTE: Se for o seu caso, remova a key `CodePushDeploymentKey` de `strings.xml`, do contrário ignore isso*

### Inserir os branches no git:

- Criar o projeto no github, seguir as instruções do github

- Enviar o projeto para o git para o branch master:
  - `git add .`
  - `git commit -m "Comentário"`
  - `git push origin master`
- Criar um novo branch:
  - `git checkout -b staging`
  - `git push origin staging`
- Voltar para o branch `master`
  - `git checkout master`

- No git informar o brach master como default, `Settings > Branches` selecionar o `master` como padrão e atualizar


### adicionando projeto no App Center

- Android

- No terminal acessar uma pasta para salvar a chave que será gerado para o staging

- Mais detalhes: [Publishing to Google Play Store](https://reactnative.dev/docs/signed-apk-android)

- E no terminal inserir o seguinte comando:


```bash
keytool -genkeypair -v -keystore NOME_DA_CHAVE_QUE_QUERO_INSERIR.keystore -alias APELIDO_DA_MINHA_CHAVE -keyalg RSA -keysize 2048 -validity 10000
```

- No lugar de `NOME_DA_CHAVE_QUE_QUERO_INSERIR` insira um nome, sem espaço ascento, ou caracter especial
- No lugar de `APELIDO_DA_MINHA_CHAVE` insira um nome, sem espaço ascento, ou caracter especial e armazene essa info em um local seguro.

- Ao pressionar enter siga os passos:

- Informe uma senha
- Confirme a senha
- Armazene em local seguro a senha, para quando precisar utilizar novamente.
- Informe os dados que é solicitado e pressione enter em todos os passos
- Umas das perguntas irá solicitar se está tudo correto, verifique se está tudo ok e informe yes
- Informe a senha da criptografia
- Armazene também essa senha em um local seguro.

