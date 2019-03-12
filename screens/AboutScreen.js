import React from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import styled from "styled-components";
import { screenWidth } from "../supporting_files/Data";

const SCREEN_WIDTH = Dimensions.get("window").width;

const xOffset = new Animated.Value(0);

const Screen = props => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        <Container>
          <ImageView>
            <Image source={data[props.index].image} />
          </ImageView>
          <Name>{data[props.index].name}</Name>
          <Subtitle>{data[props.index].title}</Subtitle>
        </Container>
      </Animated.View>
    </View>
  );
};

const transitionAnimation = index => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.25, 1, 0.25]
        })
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["45deg", "0deg", "45deg"]
        })
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["-45deg", "0deg", "45deg"]
        })
      }
    ]
  };
};

class AboutScreen extends React.Component {
  static navigationOptions = {
    title: "About"
  };

  render() {
    return (
      <Views>
        <ScrollView>
          <Title>The App</Title>
          <Subtitle style={{ marginLeft: 16, marginRight: 16, marginTop: 8 }}>
            UWL Shuttle is an app by the people for the people. Enjoy!
          </Subtitle>
          <Title>Our Developers</Title>
          <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xOffset } } }],
              { useNativeDriver: true }
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                this.props.navigation.navigate("Dev", {
                  title: "Ahmad Karkouti",
                  index: 0
                })
              }
            >
              <Screen index={0} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                this.props.navigation.navigate("Dev", {
                  title: "Franck Stephane",
                  index: 1
                })
              }
            >
              <Screen index={1} />
            </TouchableOpacity>
          </Animated.ScrollView>
          <Title>Coming Soon</Title>
          <PortalCard>
            <Subsubcontainer>
              <Logo source={require("../assets/logos/Icon-1.png")} />
              <Subview>
                <PortalTitle>UWL Portal</PortalTitle>
                <PortalSubtitle>
                  A Mobile App that helps students access their timetable,
                  registry, and all other student services.
                </PortalSubtitle>
              </Subview>
            </Subsubcontainer>
            <PortalImage source={require("../assets/snapshot.png")} />
          </PortalCard>
        </ScrollView>
      </Views>
    );
  }
}

export default AboutScreen;

const Subsubcontainer = styled.View`
  flex-direction: row;
`;

const PortalImage = styled.Image`
  width: ${screenWidth - 32 - 16};
  height: 380px;
  align-self: center;
  overflow: hidden;
`;

const PortalCard = styled.View`
  width: ${screenWidth - 32};
  height: 500px;
  background: white;
  border-radius: 5px;
  margin: 16px 16px;
  flex-direction: row;
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.15);
  border: 0.5px #cccccc solid;
  flex-direction: column;
`;

const Subview = styled.View`
  flex-direction: column;
  margin: 16px 16px 16px 0px;
`;

const Logo = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin: 16px;
`;

const PortalTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
`;

const PortalSubtitle = styled.Text`
  font-size: 12px;
  width: ${screenWidth - 32 - 80 - 16 - 16 - 8}
  color: rgba(0, 0, 0, 0.3);
`;

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: 200,
    width: SCREEN_WIDTH - 32,
    borderRadius: 5,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    marginBottom: 8
  }
});

const Views = styled.View``;

const Container = styled.View`
  /* flex-direction: column;
  width: ${250 - 50 - 32 - 1.5};
  margin: 16px 16px auto 16px; */
  width: 250px;
  height: 200px;
  justify-content: center;
  align-items: center;
`;

const Card = styled.View`
  width: 250px;
  height: 200px;
  background: white;
  border-radius: 5px;
  margin: 16px 16px;
  flex-direction: column;
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.15);
  border: 0.5px #cccccc solid;
`;

const ImageView = styled.View`
  width: 77px;
  height: 77px;
  border-radius: 38.5px;
  background: white;
  border-width: 1.5px;
  border-color: #a33c3c;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const Name = styled.Text`
  position: relative;
  font-size: 21px;
  font-weight: 700;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin: 16px auto auto 16px;
`;

const Subtitle = styled.Text`
  position: relative;
  font-size: 16px;
  font-weight: 400;
  color: #606060;
`;

const data = [
  {
    name: "Ahmad Karkouti",
    image: require("../assets/logos/ahmad.jpeg"),
    title: "Master"
  },
  {
    name: "Franck Stephane",
    image: require("../assets/logos/franck.jpeg"),
    title: "Genius"
  }
];
