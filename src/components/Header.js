import React from 'react';
import { ScrollView, StyleSheet } from "react-native";
import {
    View,
    Title,
    TextInput,
    Row,
    ImageBackground,
    Icon,
    Button,
    Text,
    Heading,
    Overlay,
    Tile
} from "@shoutem/ui";



class TileHeader extends React.Component {
  state = {};
  render() {
    return <View>
      <ImageBackground
        style={{ height: 110 }}
        source={require("../images/watermelondb.png")}
      >
        <Tile>
          <Heading styleName="secondary md-gutter-top">WatermelonDB Todo</Heading>
        </Tile>
      </ImageBackground>
    </View>;
  }
}

export default TileHeader;