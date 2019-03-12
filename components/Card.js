import React from "react";
import styled from "styled-components";
import { screenWidth } from "../supporting_files/Data";

const Card = props => (
  <View>
    <ScreenContainer>
      <Container>
        <Title>{props.title}</Title>
        <Direction>{props.direction}</Direction>
        <Distance>{props.calculate} miles</Distance>
      </Container>
      <ImageView>
        <Image source={props.image} />
        <Eta>{props.eta} min</Eta>
      </ImageView>
    </ScreenContainer>
    <Separator />
  </View>
);

export default Card;

const Eta = styled.Text`
  margin-right: 16px;
  font-size: 24px;
  font-weight: 400;
`;

const View = styled.View`
  height: 101px;
`;

const ScreenContainer = styled.View`
  flex-direction: row;
`;

const Container = styled.View`
  width: ${screenWidth - 32 - 100};
`;

const Separator = styled.View`
  background: black;
  width: ${screenWidth};
  height: 1px;
  bottom: 0px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
  margin-left: 16px;
`;
const Direction = styled.Text`
  font-size: 13px;
  color: lightgray;
  margin-left: 16px;
  margin-top: 4px;
`;
const Distance = styled.Text`
  margin-left: 16px;
  margin-top: 4px;
  color: #1586cf;
  font-weight: bold;
`;

const ImageView = styled.View`
  height: 100px;
  /* background: green; */
  width: 100px;
  flex-direction: row-reverse;
  align-content: flex-end;
  align-items: center;
`;
const Image = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 16px;
`;
