import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body
} from "native-base";
import Expo, { Font } from "expo";

export default class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    const { pet } = this.props;
    console.log(pet);

    if (this.state.loading || pet === undefined) {
      return <Text>loading</Text>;
    }
    return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: "Image URL" }} />
            <Body>
              <Text>NativeBase</Text>
              <Text note>April 15, 2016</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            {pet.media.photos.photo.map(item => {
              return (
                <Image
                  source={{ uri: item.value }}
                  style={{ height: 200, width: 200, flex: 1 }}
                />
              );
            })}
            <Image
              source={{ uri: "Image URL" }}
              style={{ height: 200, width: 200, flex: 1 }}
            />
            <Text>//Your text here</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{ color: "#87838B" }}>
              <Icon name="logo-github" />
              <Text>1,926 stars</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    );
  }
}
