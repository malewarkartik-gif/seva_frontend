import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import API from "../services/api";

export default function AddSeva() {
  const [category, setCategory] = useState("");
  const [sub, setSub] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!category || !sub) {
      Alert.alert("Error", "All fields required");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/sevas", {
        category: category,
        subcategory: sub,
      });

      Alert.alert("Success", "Seva Added Successfully");

      setCategory("");
      setSub("");

    } catch (error: any) {
      console.log(error?.response?.data);

      Alert.alert(
        "Error",
        error?.response?.data?.detail || "Failed to add seva"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>➕ Add Seva</Text>

        <Text style={styles.label}>Category</Text>
        <TextInput
          placeholder="Enter category"
          placeholderTextColor="#666"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />

        <Text style={styles.label}>Subcategory</Text>
        <TextInput
          placeholder="Enter subcategory"
          placeholderTextColor="#666"
          value={sub}
          onChangeText={setSub}
          style={styles.input}
        />

        <TouchableOpacity onPress={handleAdd} disabled={loading}>
          <LinearGradient colors={["#1a1a1a", "#333"]} style={styles.button}>
            <Text style={styles.buttonText}>
              {loading ? "Adding..." : "Add Seva"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const sharedStyles = {
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scroll: {
    padding: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  label: {
    color: "#ccc",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
};
const styles = sharedStyles;
