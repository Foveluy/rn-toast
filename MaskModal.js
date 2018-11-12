import React from "react";
import { Modal, View, Text, StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

let Ref = {};

export const Toast = {
  open: ({ duration, text, icon, callback, mask } = { text: "default" }) => {
    Ref.switch({ duration, text, icon, mask, callback });
  },
  close: () => {
    Ref.safeSetState({
      modalVisible: false
    });
  }
};
const Blue_Grey_Background = "rgb(227,235,248)";
const textColor = "rgba(0,0,50,0.65)";

export class RootToast extends React.Component {
  state = {
    modalVisible: false,
    text: void 666,
    icon: "icon",
    mask: true,
    offsetX: 0,
    offsetY: 0
  };

  safeSetState = (obj, cb) => {
    if (this.mount) {
      this.setState({ ...obj }, cb);
    }
  };

  switch = props => {
    if (!props) {
      return;
    }

    const { duration, text, icon, callback, mask } = props;

    if (duration && duration > 0) {
      setTimeout(() => {
        this.safeSetState({
          modalVisible: false
        });
      }, duration);
    }

    const AssembleIcon = icon ? (
      React.isValidElement(icon) ? (
        icon
      ) : (
        <Text style={{ color: textColor, marginRight: 8 }}>{icon}</Text>
      )
    ) : null;

    this.safeSetState(
      {
        modalVisible: true,
        text: text,
        icon: AssembleIcon,
        mask: mask === void 666 ? true : mask
      },
      callback
    );
  };

  componentWillUnmount() {
    this.mount = false;
    Ref = null;
  }

  componentDidMount() {
    this.mount = true;
    Ref = this;
  }

  renderWithModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() =>
          this.setState({
            modalVisible: false
          })
        }
      >
        <View style={styles.outsideContainer}>
          <View style={styles.container}>
            {this.state.icon}
            <Text style={{ color: textColor }}>{this.state.text}</Text>
          </View>
        </View>
      </Modal>
    );
  };

  onWithoutMaskLayout = e => {
    const layout = e.nativeEvent.layout;
    this.setState({
      offsetX: WIDTH / 2 - layout.width / 2,
      offsetY: HEIGHT / 2 - layout.height / 2
    });
  };

  renderWithoutModal = () => {
    if (!this.state.modalVisible) return null;
    return (
      <View
        style={{
          position: "absolute",
          left: this.state.offsetX,
          marginTop: this.state.offsetY
        }}
      >
        <View
          onLayout={this.onWithoutMaskLayout}
          style={styles.outsideContainer}
        >
          <View style={styles.container}>
            {this.state.icon}
            <Text style={{ color: textColor }}>{this.state.text}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.state.mask ? this.renderWithModal() : this.renderWithoutModal()}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Blue_Grey_Background,
    padding: 16,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  outsideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  }
});
