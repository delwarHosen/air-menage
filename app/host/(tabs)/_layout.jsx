import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Dimensions, Platform, View } from "react-native";
import { CalenderIcon, HomeIcon, MenuIcon, MessageIcon, PropertiesIcon } from "../../../assets/icons/Icons";
import { scale } from "../../../components/adaptive/Adaptiveness";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function TabsLayout() {
  const { t } = useTranslation();

  // Responsive tab bar height with constraints
  const getTabBarHeight = () => {
    if (Platform.OS === 'ios') {
      // iPhone with notch has more bottom space
      return SCREEN_HEIGHT > 800 ? 85 : 75;
    }
    // Android: constrain between 60-75
    return Math.min(Math.max(SCREEN_HEIGHT * 0.09, 60), 75);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#00AFF5",
          tabBarInactiveTintColor: "#6B7280",
          tabBarStyle: {
            height: getTabBarHeight(),
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            paddingBottom: Platform.OS === 'ios' ? 10 : 8,
            paddingTop: 8,
          },
          tabBarItemStyle: {
            flexDirection: 'column',
            justifyContent: 'center',
            paddingVertical: 4,
          },
          tabBarLabelStyle: {
            fontSize: scale(11),
            lineHeight: scale(14),
            fontFamily: "SyneMedium",
            marginTop: 2,
          },
          tabBarIconStyle: {
            marginBottom: 2,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: t("tabs.home"),
            tabBarIcon: ({ color }) => <HomeIcon color={color} size={scale(24)} />,
          }}
        />
        <Tabs.Screen
          name="calender"
          options={{
            title: t("tabs.calender"),
            tabBarIcon: ({ color }) => <CalenderIcon color={color} size={scale(24)} />,
          }}
        />
        <Tabs.Screen
          name="properties"
          options={{
            title: t("tabs.properties"),
            tabBarIcon: ({ color }) => <PropertiesIcon color={color} size={scale(24)} />,
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            title: t("tabs.message"),
            tabBarIcon: ({ color }) => <MessageIcon color={color} size={scale(24)} />,
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: t("tabs.menu"),
            tabBarIcon: ({ color }) => <MenuIcon color={color} size={scale(24)} />,
          }}
        />
      </Tabs>
    </View>
  );
}