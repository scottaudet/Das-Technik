import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import InputQuery from '../components/InputQuery';
import Table, { Section, StaticCell } from 'react-native-js-tableview';
import { StatusBar } from 'react-native';

const moodOptions = 5

export default class FoodScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      totalCal: 0,
      totalFat: 0,
      totalCarbs: 0,
      totalProt: 0,

      entryCal: 0,
      entryFat: 0,
      entryCarbs: 0,
      entryProt: 0,

      selectedIndex: 2,
      
      moods: [0, 0, 0, 0, 0],
      currentMood: 2,
    }

    this.averageMood = this.averageMood.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
  }

  averageMood() {
    var sum = 0
    var avg = 2
    var arr = this.state.moods
    
    arr.forEach(val => sum += val)
    avg = sum / moodOptions
    console.log(avg)

    var diff = new Array(moodOptions)

    for (var i = 0; i < moodOptions; i++) {
      diff[i] = avg - arr[i]
    }
    var low = diff[0]
    var index = 0
    for (var j = 1; j < moodOptions; j++) {
      if (diff[j] < low) {
        low = diff[j]
        index = j
      }
    }

    this.setState({currentMood: index})
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  _onAddFood = () => {
    this.setState({totalCal: this.state.totalCal + this.state.entryCal})
    this.setState({totalFat: this.state.totalFat + this.state.entryFat})
    this.setState({totalCarbs: this.state.totalCarbs + this.state.entryCarbs})
    this.setState({totalProt: this.state.totalProt + this.state.entryProt})

    var arr = this.state.moods
    arr[this.state.selectedIndex] += 1
    this.setState({moods: arr})

    this.averageMood()
  }

  render = () => {
    const buttons = ['😀', '🤣', '😎', '😂', '😁']
    const { selectedIndex } = this.state

    return (
      <>
        <StatusBar
					backgroundColor="black"
					barStyle={'dark-content'} />

        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <InputQuery style={styles.textInput} name='Name' placeholder="Enter name here"/>
          <InputQuery name='Calories' placeholder="Enter calories here" onChangeText={(text) => this.setState({entryCal: parseInt(text)})}/>
          <InputQuery name='Fat' placeholder="Enter fat here" onChangeText={(text) => this.setState({entryFat: parseInt(text)})}/>
          <InputQuery name='Carbohydrates' placeholder="Enter carbohydrates here" onChangeText={(text) => this.setState({entryCarbs: parseInt(text)})}/>
          <InputQuery name='Protein' placeholder="Enter protein here" onChangeText={(text) => this.setState({entryProt: parseInt(text)})}/>
        </View>

        <Button title="Add Food" onPress={this._onAddFood} />
        <ButtonGroup
          style={{flex: 1}}
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />

        <Table style={styles.container} theme="dark" accentColor="gold" scrollable={true}>
          <Section header="Food Intake Rundown">
            <StaticCell title={this.state.totalCal + " kcal"} subtitle="Calories" accessory="details" />
            <StaticCell title={this.state.totalFat + "g"} subtitle="Fat" accessory="details" />
            <StaticCell title={this.state.totalCarbs + "g"} subtitle="Carbohydrates" accessory="details" />
            <StaticCell title={this.state.totalProt + "g"} subtitle="Protein" accessory="details" />
          </Section>
          <Section>
            <StaticCell title={buttons[this.state.currentMood]}/>
          </Section>
        </Table>
      </>
    );
  };
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		marginBottom: 30,
	},
});
