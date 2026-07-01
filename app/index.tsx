import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { supabase } from "../src/lib/supabase";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }

      setLoading(false);
    }

    checkSession();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return null;
}
