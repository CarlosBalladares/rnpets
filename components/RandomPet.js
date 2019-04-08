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
  Title,
  Body,
  CheckBox
} from "native-base";
import Expo, { Font } from "expo";
import axios from "axios";
import { NativeRouter, Route, Link, Redirect } from "react-router-native";

function getPetData(pet) {
  // const res = {}
  const photo = pet.media.photos.photo.find(item => {
    return item["@size"] === "x";
  });
  console.log(pet);
  const name = Object.values(pet.name)[0];
  const description = Object.values(pet.description).length
    ? Object.values(pet.description)[0]
    : "No description available";
  let breed = Array.isArray(pet.breeds.breed)
    ? pet.breeds.breed.reduce((acc, s) => Object.values(s)[0] + ",  " + acc, "")
    : Object.values(pet.breeds.breed)[0];

  breed = breed
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length)
    .join(", ");
  const phone = Object.values(pet.contact.phone)[0] || "No phone available";
  const email = Object.values(pet.contact.email)[0] || "NA";
  const state = Object.values(pet.contact.state)[0] || "NA";
  const update = Object.values(pet.lastUpdate)[0] || "NA";
  return { photo, name, description, breed, phone, state, email, update };
}

export default class RandomPet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      navigate: { val: false, reditect: "/" },
      loadedPet: false,
      checked: true
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    console.log("hey");
    var randomurl =
      "http://api.petfinder.com/pet.getRandom?format=json&key=860324afdc30f92b5ccf51f9c50132e5&animal=dog";

    var baseurl =
      "http://api.petfinder.com/pet.get?format=json&key=860324afdc30f92b5ccf51f9c50132e5";
    axios.get(randomurl).then((res, rej) => {
      if (res.status !== 200) return;
      var id = Object.values(res.data.petfinder.petIds.id)[0];

      axios.get(baseurl + "&id=" + id).then((res, rej) => {
        // if(res.status!==200) res.send("err");
        const pet = res.data.petfinder.pet;
        this.setState({
          id,
          ...getPetData(pet),
          loadedPet: true
        });
      });
    });
  }

  handlePress(link) {
    return e => {
      this.setState({
        navigate: {
          val: true,
          reditect: link
        }
      });
    };
  }

  handleCheck() {
    if (this.state.checked === true) {
      this.setState({
        checked: false
      });
    } else {
      this.setState({
        checked: true
      });
    }
  }

  render() {
    const { pet } = this.props;
    console.log(pet);
    const { navigate, loadedPet } = this.state;

    // if (this.state.loading || pet === undefined) {
    //   return <Text>loading</Text>;
    // }
    if (navigate.val) {
      return <Redirect to={navigate.reditect} push={true} />;
    }

    console.log(this.state.photo);

    if (!loadedPet) {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.handlePress("/")}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Loading</Title>
            </Body>
          </Header>
          <Content>
            <Text>Fetching</Text>
          </Content>
        </Container>
      );
    }
    return (
      <>
        <Header>
          <Left>
            <Button transparent onPress={this.handlePress("/")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Adopt {this.state.name}</Title>
          </Body>
        </Header>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: this.state.photo["$t"]
                }}
              />
              <Body>
                <Text>{this.state.name}</Text>
                <Text note>last update: {this.state.update}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image
                source={{ uri: this.state.photo["$t"] }}
                style={{ height: 200, width: 200, flex: 1 }}
              />
              <Text>{this.state.description}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <CheckBox
                ckeched={this.state.checked}
                onPress={this.handleCheck}
              />
              <Button transparent textStyle={{ color: "#87838B" }}>
                {/* <Icon name="logo-github" /> */}
                <Text>Adopt this dog</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </>
    );
  }
}
