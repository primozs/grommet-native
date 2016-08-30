# grommet-native

React-native version of [Grommet](https://grommet.github.io/).

### Install

First, set up a react-native project according to the
[react-native Getting Started guide](https://facebook.github.io/react-native/docs/getting-started.html#content).

Then, install grommet-native:

```
  $ npm install grommet-native
```

In order to use the SVG icons in grommet-native, you will also need to link in
react-native-svg:

```
  $ rnpm link react-native-svg
```

Use grommet-native components:

```
import { Text, Box, Heading, FormFields, Button, FormField,
style } from 'grommet-native';
```

### Theming

You can specify one of the pre-packaged themes (`hpe`, `aruba`, `hpinc`):

```
import { style } from 'grommet-native';

style.theme('hpe');
```

NOTE: You will need to install any theme specific fonts in your Android and iOS projects. See these instructions:

[iOS custom fonts](https://medium.com/@dabit3/adding-custom-fonts-to-react-native-b266b41bff7f#.qra9hyp7r)

[Android custom fonts](https://medium.com/@gattermeier/custom-fonts-in-react-native-for-android-b8a331a7d2a7#.19rzlytqz)

### Support / Contributing

Before opening an issue or pull request, please read the [Contributing](https://github.com/grommet/grommet/blob/master/CONTRIBUTING.md) guide.
