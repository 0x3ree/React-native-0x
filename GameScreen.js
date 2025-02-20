import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Tittle from "../components/ui/Tittle";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { template } from "@babel/core";

// random number generator template
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

// this function is to generate the random number for the computer to guess
// the onGameOver function is to call the gameOverHandler function from the App.js file
function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // this useeffects is to check if the current guess is equal to the user number which then calls the onGameOver function
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]); // depedencies

  function nextGuessHandler(direction) {
    // lower or higher
    // this if statment is to check if the user is lying so as to stop the game from crashing
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" }, // alert styling
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNum);
  }
  return (
    <View style={styles.screen}>
      <View style={styles.tittle}>
        <Tittle>Opponent's Guess</Tittle>
      </View>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower </Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
            +
          </PrimaryButton>
        </View>
      </View>
      {/*<View> LOG ROUNDS </View>*/}
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  tittle: {
    marginTop: 24,
  },
});
