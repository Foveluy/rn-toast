# rn-toast

# install

```
npm install --save rn-top-toast
```

# usage

```js
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootToast, Toast } from "./MaskModal";

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      Toast.open({ text: "hello", duration: 5000 });
    }, 100);
  }

  render() {
    return (
      <View style={styles.container}>
        <RootToast />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
```
