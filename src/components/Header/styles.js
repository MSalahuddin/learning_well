// @flow
import { StyleSheet, Platform } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 4,
    backgroundColor: "#0d1c2f",
    height: Metrics.screenHeight * 0.08,
    flexDirection: "row"
  },
  menuImage: {
    width: Metrics.ratio(25),
    height: Metrics.ratio(25)
  },
  TouchableMenu: {
    width: Metrics.ratio(65),
    height: Metrics.ratio(65)

    // justifyContent: "center",
    // alignItems: "center"
  },

  headerText: {
    fontWeight: Platform.OS === "ios" ? "bold" : "bold",

    width:
      Metrics.screenWidth - (Metrics.doubleBaseMargin + Metrics.baseMargin),
    //textAlign: "center",
    fontSize: Metrics.ratio(18),
    fontFamily: Fonts.type.AvenirNextDemiBold,
    color: "white",
    paddingLeft: Metrics.ratio(80),
    marginTop: Metrics.ratio(20)
  }
});