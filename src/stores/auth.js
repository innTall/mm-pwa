import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../api/supabase.js";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(null);

  // Getters (computed properties)
  const isAuthenticated = computed(() => user.value !== null);

  // Actions
  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      user.value = data?.user;
    } catch (err) {
      console.error("Error fetching user:", err);
      user.value = null;
    }
  };

  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      user.value = data?.user;
    } catch (err) {
      console.error("Error signing up:", err);
      throw err;
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      user.value = data?.user;
    } catch (err) {
      console.error("Error signing in:", err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      user.value = null;
    } catch (err) {
      console.error("Error signing out:", err);
      throw err;
    }
  };

  // Expose state, getters, and actions
  return {
    user,
    isAuthenticated,
    fetchUser,
    signUp,
    signIn,
    signOut,
  };
});
