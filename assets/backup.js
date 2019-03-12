import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";

class AboutScreen extends React.Component {
  render() {
    return (
      <View>
        <Title>Developers</Title>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.map((developer, index) => (
            <Card key={index}>
              <Image source={developer.image} />
              <Container>
                <Name>{developer.name}</Name>
                <Subtitle>{developer.title}</Subtitle>
              </Container>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default AboutScreen;

const View = styled.View``;

const Container = styled.View`
  flex-direction: column;
  width: ${250 - 50 - 32 - 1.5};
  margin: 16px 16px auto 16px;
`;

const Subtitle = styled.Text`
  position: relative;
  font-size: 16px;
  font-weight: 400;
`;

const Card = styled.View`
  width: 250px;
  height: 200px;
  background: white;
  border-radius: 5px;
  margin: 32px 16px;
  flex-direction: row;
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
  border: 0.5px #cccccc solid;
`;

const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 16px 0 auto 16px;
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

const data = [
  {
    name: "Franck Stephane",
    image: require("../assets/logos/franck.jpeg"),
    title: "Genius"
  },
  {
    name: "Ahmad Karkouti",
    image: require("../assets/logos/ahmad.jpeg"),
    title: "Master"
  }
];
