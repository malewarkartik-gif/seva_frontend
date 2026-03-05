import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ManageSevas() {
  const [sevas, setSevas] = useState({
    "Temple Cleaning": [
      "Garbhagriha Cleaning",
      "Hall Cleaning",
      "Floor Mopping",
    ],
    "Kitchen Seva": ["Vegetable Cutting", "Cooking", "Serving Prasadam"],
  });

  const [editVisible, setEditVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSeva, setSelectedSeva] = useState("");
  const [updatedSeva, setUpdatedSeva] = useState("");

  // ------------------ UPDATE ------------------
  const openEdit = (category: string, seva: string) => {
    setSelectedCategory(category);
    setSelectedSeva(seva);
    setUpdatedSeva(seva);
    setEditVisible(true);
  };

  const handleUpdate = () => {
    if (!updatedSeva.trim()) {
      Alert.alert("Seva name required");
      return;
    }

    setSevas((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].map((s) =>
        s === selectedSeva ? updatedSeva : s,
      ),
    }));

    setEditVisible(false);
  };

  // ------------------ DELETE SEVA ------------------
  const handleDeleteSeva = (category: string, seva: string) => {
    Alert.alert("Confirm", `Delete ${seva}?`, [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          setSevas((prev) => ({
            ...prev,
            [category]: prev[category].filter((s) => s !== seva),
          }));
        },
      },
    ]);
  };

  // ------------------ DELETE CATEGORY ------------------
  const handleDeleteCategory = (category: string) => {
    Alert.alert("Confirm", `Delete entire ${category}?`, [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updated = { ...sevas };
          delete updated[category];
          setSevas(updated);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>⚙ Manage Sevas</Text>

        {Object.keys(sevas).map((category, index) => (
          <View key={index} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category}</Text>

              <TouchableOpacity onPress={() => handleDeleteCategory(category)}>
                <Ionicons name="trash-outline" size={20} color="#ff4d4d" />
              </TouchableOpacity>
            </View>

            {sevas[category].map((seva, idx) => (
              <View key={idx} style={styles.sevaRow}>
                <Text style={styles.sevaText}>{seva}</Text>

                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => openEdit(category, seva)}>
                    <Ionicons name="create-outline" size={20} color="#4da6ff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDeleteSeva(category, seva)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ff4d4d" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* UPDATE MODAL */}
      <Modal visible={editVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Update Seva</Text>

            <TextInput
              style={styles.input}
              value={updatedSeva}
              onChangeText={setUpdatedSeva}
              placeholder="Seva name"
              placeholderTextColor="#666"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setEditVisible(false)}>
                <Text style={{ color: "#aaa" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                <Text style={{ color: "#fff" }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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

  categoryCard: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
  },

  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  categoryTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  sevaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },

  sevaText: {
    color: "#ccc",
  },

  iconRow: {
    flexDirection: "row",
    gap: 15,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#111",
    width: "100%",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    marginBottom: 15,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  updateBtn: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
  },
});
