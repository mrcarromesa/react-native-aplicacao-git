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
