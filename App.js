import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  // this state is to check if the game is over or not which will be called from the GameScreen component,
  // and it's ture bcos the game is kinda over when the user picks a number
  const [gameIsOver, setGameIsOver] = useState(true);

  // this fucntion is to set the user number to the picked number and set the game to not over
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false); // the game is not over when the user picks a number that's why we set it to false this helps so when we
    //  inpuut a number and the game is over will not trigger the game over screen
    //  and to indicate that the game just started and isn't over yet is why we set it to false
  }

  // this function is to set the game to over when the game is over which will be called from the GameScreen component in two places.
  function gameOverHandler() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }
  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen} //'cover' the availabe space of the screen from parent
        imageStyle={styles.backgroundImage} // responsible for the opacity of the image in order to blend with the gradient
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
