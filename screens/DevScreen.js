import React from "react";
import styled from "styled-components";
import { SafeAreaView, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../supporting_files/Data";

class DevScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    myProps: []
  };

  componentDidMount() {
    this.setState({
      myProps: data[this.props.navigation.state.params.index]
    });
  }

  render() {
    return (
      <View>
        <SafeAreaView>
          <Background source={this.state.myProps.background} />
          <Container>
            <Name>{this.state.myProps.title}</Name>
            <Quote>"{this.state.myProps.quote}"</Quote>
            <ImageContainer>
              <Image source={require("../assets/logos/logo-swift.png")} />
              <Image source={require("../assets/logos/logo-react.png")} />
              <Image source={require("../assets/logos/logo-sketch.png")} />
              <Image source={require("../assets/logos/logo-xcode.png")} />
            </ImageContainer>
          </Container>
        </SafeAreaView>
      </View>
    );
  }
}

export default DevScreen;

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

const Container = styled.View`
  flex-direction: column;
  margin-top: 70px;
`;

const View = styled.View``;

const Background = styled.Image`
  width: ${screenWidth};
  height: ${screenHeight};
  position: absolute;
  z-index: -1;
`;

const Name = styled.Text`
  align-self: center;
  font-size: 36px;
  font-weight: 700;
  color: white;
`;

const Quote = styled.Text`
  align-self: center;
  font-size: 13px;
  color: #b7bfcc;
`;

const Image = styled.Image`
  width: 50px;
  height: 50px;
  margin-left: 8px;
  margin-right: 8px;
`;

const ImageContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 16px;
`;

const data = [
  {
    title: "Ahmad Karkouti",
    quote: "Coding is the closest thing to magic!",
    background: require("../assets/stops/wallpaper.jpg")
  },
  {
    title: "Franck Stephane",
    quote: "Ahmad is cool",
    background: require("../assets/stops/wallpaper.jpg")
  }
];
