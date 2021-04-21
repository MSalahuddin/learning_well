// @flow
import React from "react";

import { Image, View } from "react-native";
import { connect } from "react-redux";

import {
  Stack,
  Scene,
  Actions,
  ActionConst,
  Drawer
} from "react-native-router-flux";
import Sidebar from "../../containers/Sidebar";
import { TabButtonLeft, Header } from "../../components";
import { Images, Metrics, Colors, Fonts } from "../../theme";
import DashboardScreen from "../../containers/Dashboard"

// const mapStateToProps = state => {
//   return {
//     cartData: state.cart.data
//   };
// };

// const ConnectedNavIcon = connect(mapStateToProps)(NavIcon);

class DrawerMenu {
  getDrawerMenu() {
    return (
      <Drawer
        drawer
        menuPosition={"left"}
        hideNavBar
        type={ActionConst.RESET}
        key="dashboard"
        contentComponent={Sidebar}
        renderLeftButton={() => (
          <TabButtonLeft
            imagesArray={["rightArrow"]}
            actions={[Actions.drawerOpen]}
          />
        )}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={ratio => {
          return {
            mainOverlay: {
              opacity: ratio === 0 ? 0 : 0.3,
              backgroundColor: "#000"
            }
          };
        }}
        drawerWidth={Metrics.screenWidth * 0.8}
      >
        <Scene hideNavBar>
          <Stack key="root">
            {/* ///////////////////////tab////////////////////////////////// */}
            <Scene
              hideNavBar
              key="dashboardScreen"
              renderLeftButton={() => (
                <TabButtonLeft
                  imagesArray={["menu"]}
                  actions={[Actions.drawerOpen]}
                />
              )}
              component={DashboardScreen}
            />
          </Stack>
        </Scene>
      </Drawer>
    );
  }
}

export default new DrawerMenu();
