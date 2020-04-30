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
import { render, fireEvent } from '@testing-library/react-native';
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
    process.nextTick(() => {
      // Inserir o expect() aqui
      debug();
      // expect().toBe();
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
import { render, fireEvent, cleanup } from '@testing-library/react-native';
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
    process.nextTick(() => {
      debug();
      expect(getByTestId('main-input-add-user')).toHaveProp('value', '');
      expect(getByTestId('main-button-add-user')).toHaveProp('loading', false);
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
import { render, fireEvent, cleanup } from '@testing-library/react-native';
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

    process.nextTick(() => {
      // verificamos se é chamado.
      expect(Alert.alert).toHaveBeenCalled();
    });
  });
});
```

- Mais detalhes: [How to mock specific module function in jest?](https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4)

