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

export default function SeeUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "Rohan", mobile: "9876543210" },
    { id: 2, name: "Amit", mobile: "9876500000" },
    { id: 3, name: "Suresh", mobile: "9123456789" },
  ]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newName, setNewName] = useState("");
  const [newMobile, setNewMobile] = useState("");

  const handleDelete = (id: number, name: string) => {
    Alert.alert("Confirm Delete", `Delete ${name}?`, [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          setUsers(users.filter((user) => user.id !== id));
        },
      },
    ]);
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setNewName(user.name);
    setNewMobile(user.mobile);
    setEditModalVisible(true);
  };

  const handleUpdate = () => {
    if (!newName || newMobile.length !== 10) {
      Alert.alert("Invalid input");
      return;
    }

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? { ...user, name: newName, mobile: newMobile }
          : user,
      ),
    );

    setEditModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>👥 Users List</Text>

        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.mobile}>{user.mobile}</Text>
            </View>

            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => openEditModal(user)}>
                <Ionicons name="create-outline" size={22} color="#4da6ff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(user.id, user.name)}
              >
                <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Update User</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#666"
              value={newName}
              onChangeText={setNewName}
            />

            <TextInput
              style={styles.input}
              placeholder="Mobile"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={newMobile}
              onChangeText={setNewMobile}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={{ color: "#ccc" }}>Cancel</Text>
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
    fontWeight: "bold",
    marginTop: 20,
    color: "#fff",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  mobile: {
    color: "#888",
    fontSize: 13,
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

  cancelBtn: {
    padding: 12,
  },

  updateBtn: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
  },
});
