import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginBottom: 30,
  },
  imageOverlay: {
    opacity: 0.6,
    flex: 1,
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    width: 70,
    borderRadius: 50,
    padding: 12,
    paddingBottom: 7,
    position: "absolute",
    bottom: 50,
    left: "42%",
  },
  buttonContainerImg: {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: 70,
    borderRadius: 50,
    padding: 12,
    paddingBottom: 7,
    position: "absolute",
    bottom: 50,
    left: "12%",
  },
  buttonContainerCancel: {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: 70,
    borderRadius: 50,
    padding: 12,
    paddingBottom: 7,
    position: "absolute",
    bottom: 50,
    left: "72%",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
  },
  cameraIcon: {
    marginBottom: 5,
  },
  photoIcon: {
    marginBottom: 5,
    color: "white",
  },
  cancelIcon: {
    marginBottom: 5,
    color: "red",
  },
  image: {
    flex: 1,
    opacity: 0.5,
  },
});

export default styles;
