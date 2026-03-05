import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { green } from "react-native-reanimated/lib/typescript/Colors";

export default function ConfirmModal({
  visible,
  onConfirm,
  onCancel,
}: any) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Confirm Submission</Text>

          <Text style={styles.message}>
            Are you ready to submit this seva? 🙏
          </Text>

          <View style={styles.buttonRow}>
            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelBtn}
              activeOpacity={0.8}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            {/* Confirm Button */}
            <TouchableOpacity activeOpacity={0.8} onPress={onConfirm}>
              <LinearGradient
                colors={["green", "green"]}
                style={styles.confirmBtn}
              >
                <Text style={styles.confirmText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContainer: {
    width: "100%",
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 25,
    elevation: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  message: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 25,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#222",
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },

  cancelText: {
    color: "#ccc",
    fontWeight: "500",
  },

  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal:20,
    borderRadius: 10,
    alignItems: "center",
  },

  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});