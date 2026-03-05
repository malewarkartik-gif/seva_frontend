import { Stack, Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function AdminLayout() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Redirect href="/admin-login" />;
  }

  return (
    <>
      {/* Status bar white icons on black background */}
      <StatusBar style="light" backgroundColor="#0e0d0d" />

      <Stack
        screenOptions={{
          headerShown: false, // Remove default white header
        }}
      />
    </>
  );
}