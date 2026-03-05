import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

export default function AdminLogin() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      login();
      router.replace("/admin/dashboard");
    } else {
      Alert.alert("Invalid credentials");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>🔐 Admin Login</Text>
          <Text style={styles.subtitle}>
            Authorized access only
          </Text>

          {/* Username */}
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Enter username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          {/* Login Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            <LinearGradient
              colors={["#1f1f1f", "#333"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 120, // prevents tab overlap
  },

  card: {
    backgroundColor: "#111",
    padding: 25,
    borderRadius: 20,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    color: "#888",
    marginBottom: 25,
  },

  label: {
    color: "#ccc",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 14,
  },

  button: {
    marginTop: 25,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});