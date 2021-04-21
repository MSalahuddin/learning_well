// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#253149", opacity: 0.97 },
  container: {
   
  flex: 1
    // backgroundColor: "red"
    // borderWidth: 2,
    // borderColor: "black"
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkStaleBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.ratio(5)
},
checkedCircle:{
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: Colors.darkStaleBlue
}

});
