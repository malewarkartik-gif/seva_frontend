import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Manage Sevas",
      icon: "settings-outline",
      route: "/admin/manage-sevas",
    },
    {
      title: "Add Seva",
      icon: "add-circle-outline",
      route: "/admin/add-seva",
    },
    {
      title: "Add User",
      icon: "person-add-outline",
      route: "/admin/add-user",
    },
    {
      title: "See Users",
      icon: "people-outline",
      route: "/admin/see-users",
    },
    {
      title: "Reports",
      icon: "document-text-outline",
      route: "/admin/reports",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>📊 Admin Dashboard</Text>
        <Text style={styles.subtitle}>
          Manage temple operations efficiently
        </Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => router.push(item.route)}
          >
            <LinearGradient colors={["#1a1a1a", "#222"]} style={styles.card}>
              <View style={styles.row}>
                <Ionicons name={item.icon as any} size={22} color="#fff" />
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={18} color="#888" />
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity activeOpacity={0.8} onPress={logout}>
          <LinearGradient
            colors={["#330000", "#550000"]}
            style={styles.logoutBtn}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },

  title: {
    fontSize: 26,
    marginTop: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    color: "#888",
    marginBottom: 25,
  },

  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },

  logoutBtn: {
    marginTop: 30,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
