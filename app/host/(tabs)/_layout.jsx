import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { CalenderIcon, HomeIcon, MenuIcon, MessageIcon, PropertiesIcon } from "../../../assets/icons/Icons";
import { scale, verticalScale } from "../../../components/adaptive/Adaptiveness";

export default function TabsLayout() {
  const { t } = useTranslation(); // i18n translation hook

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#00AFF5",
          tabBarInactiveTintColor: "#6B7280",
          tabBarStyle: {
            height: verticalScale(74),
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            borderBottomLeftRadius: scale(10),
            borderBottomRightRadius: scale(10),
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
            marginBottom: verticalScale(11),
          },
          tabBarLabelStyle: {
            fontSize: scale(14),
            fontFamily: "SyneMedium",
            marginTop: verticalScale(10),
          },
          tabBarIconStyle: {
            marginBottom: verticalScale(2),
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: t("tabs.home"),
            tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="calender"
          options={{
            title: t("tabs.calender"),
            tabBarIcon: ({ color, size }) => <CalenderIcon color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="properties"
          options={{
            title: t("tabs.properties"),
            tabBarIcon: ({ color, size }) => <PropertiesIcon color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            title: t("tabs.message"),
            tabBarIcon: ({ color, size }) => <MessageIcon color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: t("tabs.menu"),
            tabBarIcon: ({ color, size }) => <MenuIcon color={color} size={size} />,
          }}
        />
      </Tabs>
    </View>
  );
}
