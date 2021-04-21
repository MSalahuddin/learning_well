import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#253149", opacity: 0.97 },
  container: {
   
   height: Metrics.screenHeight
    // backgroundColor: "red"
    // borderWidth: 2,
    // borderColor: "black"
  },
  backIcon: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
    borderRadius: 100,
    backgroundColor: 'white',
    marginLeft: Metrics.ratio(10),
    marginTop: Metrics.ratio(30),
    elevation: 8,
    alignItems: 'center', justifyContent: 'center'
  },
  courseNameText:{
      fontWeight: 'bold',
      fontSize: Metrics.ratio(22),
      color: Colors.darkStaleBlue,
      marginTop:Metrics.ratio(10),
      marginLeft: Metrics.ratio(10)
  },
  courseDetailText: {
      color: Colors.davygrey,
      marginLeft: Metrics.ratio(10),
      fontSize: Metrics.ratio(12)
  },
  chapterHeadingText: {
      fontSize: Metrics.ratio(18),
      fontWeight: 'bold',
      color: 'black',
      marginLeft: Metrics.ratio(10),
      marginRight: Metrics.ratio(10),
  },
  notContentAvailable: {
    fontSize: Metrics.ratio(14),
    fontWeight: 'bold',
    color: 'black',
    marginLeft: Metrics.ratio(10),
    marginRight: Metrics.ratio(10),
},
  chaptervideoText: {
      color: Colors.davygrey,
      fontSize: Metrics.ratio(12),
      marginLeft: Metrics.ratio(10)
  }
});