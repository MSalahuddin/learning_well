import React, { Component } from "react";
import { ActivityIndicator, Image } from "react-native";
import PropTypes from "prop-types";
import { Images, Metrics, Colors } from "./../../theme";
import Spinner from "react-native-loading-spinner-overlay";
class SpinnerLoader extends Component {
 static propTypes = {
   //selectedTab: PropTypes.oneOf(["mycars", "addcar"]),
   isloading: PropTypes.bool
 };
 static defaultProps = {
   isloading: false
 };
 render() {
   const { isloading } = this.props;
   return (
     <Spinner
       visible={isloading}
       color={"black"}
       // textContent={"Loading..."}
       // textStyle={{ color: "white" }}
       size="normal"
       customIndicator={
         <ActivityIndicator size="large" color= {Colors.darkStaleBlue} />
         //   <Image
         //     style={{
         //       width: Metrics.ratio(42),
         //       height: Metrics.ratio(50)
         //     }}
         //     source={Images.loader}
         //   />
       }
     />
   );
 }
}
export default SpinnerLoader;