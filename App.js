import "react-native-gesture-handler";
import { View, Text, Image } from "react-native";
import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import User from "./assets/user.jpg";
import Backups from "./screens/Backups";
import Categories from "./screens/Categories";
import Contact from "./screens/Contact";
import Customize from "./screens/Customize";
import GetPremium from "./screens/GetPremium";
import Home from "./screens/Home";
import RateApp from "./screens/RateApp";
import Settings from "./screens/Settings";
import Timer from "./screens/Timer";
import HomeScreen from "./screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  source={User}
                  style={{
                    height: 130,
                    width: 130,
                    borderRadius: 65,
                  }}
                />
                <Text
                  style={{
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: "bold",
                    color: "#111",
                  }}
                >
                  Isabella Joanna
                </Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerLabelStyle: {
            color: "#111",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: "홈 페이지",
            title: "홈 페이지",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            ),
          }}
          component={HomeScreen}
        />
        <Drawer.Screen
          name="Timer"
          options={{
            drawerLabel: "맵",
            title: "맵",
            drawerIcon: () => <Feather name="map" size={20} color="#808080" />,
          }}
          component={Timer}
        />
        <Drawer.Screen
          name="Categories"
          options={{
            drawerLabel: "예보 이미지",
            title: "예보 이미지",
            drawerIcon: () => (
              <Ionicons name="image-outline" size={20} color="#808080" />
            ),
          }}
          component={Categories}
        />
        <Drawer.Screen
          name="Customize"
          options={{
            drawerLabel: "알림 설정",
            title: "알림 설정",
            drawerIcon: () => (
              <Ionicons
                name="md-notifications-outline"
                size={20}
                color="#808080"
              />
            ),
          }}
          component={Customize}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: "설정",
            title: "설정",
            drawerIcon: () => (
              <SimpleLineIcons name="settings" size={20} color="#808080" />
            ),
          }}
          component={Settings}
        />

        <Drawer.Screen
          name="Backups"
          options={{
            drawerLabel: "광조제거",
            title: "광조제거",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="advertisements"
                size={20}
                color="#808080"
              />
            ),
          }}
          component={Backups}
        />

        <Drawer.Screen
          name="Get Premium"
          options={{
            drawerLabel: "Get Premuim",
            title: "Get Premium",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="certificate"
                size={20}
                color="#808080"
              />
            ),
          }}
          component={GetPremium}
        />
        <Drawer.Screen
          name="Rate this App"
          options={{
            drawerLabel: "Rate this App",
            title: "Rate this App",
            drawerIcon: () => (
              <FontAwesome name="star" size={20} color="#808080" />
            ),
          }}
          component={RateApp}
        />

        <Drawer.Screen
          name="Contact"
          options={{
            drawerLabel: "연락하기",
            title: "연락하기",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="message-alert-outline"
                size={20}
                color="#808080"
              />
            ),
          }}
          component={Contact}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
