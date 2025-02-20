import { Text, StyleSheet } from "react-native";
function Tittle({ children }) {
  return <Text style={styles.tittle}>{children}</Text>;
}

export default Tittle;

const styles = StyleSheet.create({
  tittle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
  },
});
