import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          paddingBottom: insets.bottom,   // only safe padding
          paddingTop: 6,
          height: 60 + insets.bottom,     // controlled height
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#666",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 4,
        },

        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Seva",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="flower"
              size={focused ? 24 : 22}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="admin-login"
        options={{
          title: "Admin",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="lock-closed"
              size={focused ? 24 : 22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}