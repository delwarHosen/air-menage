import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { scale, verticalScale } from "../../../components/adaptive/Adaptiveness";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* StatusBar setup */}
      {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#175994",
          tabBarInactiveTintColor: "#000000",
          tabBarStyle: {
            height: verticalScale(74),
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            paddingBottom: verticalScale(0),
            paddingTop: verticalScale(0),
            borderBottomLeftRadius: scale(10),
            borderBottomRightRadius: scale(10),
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
            marginTop: verticalScale(10),
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            // fontFamily: "Poppins_400Regular",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calender"
          options={{
            title: "Calender",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-clear-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="properties"
          options={{
            title: "properties",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="reader-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            title: "Message",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}