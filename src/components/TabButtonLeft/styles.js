import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    // flexDirection: "row",
    // height: Metrics.navBarHeight,
    alignItems: "center",
    justifyContent: "center",
    width: 50
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 40,
    paddingLeft: Metrics.ratio(5)
    // paddingLeft: Metrics.ratio(25),
    // backgroundColor: 'pink'
  },
  icon: {
    width: Metrics.image.twofour,
    height: Metrics.image.twofour
  }
});
