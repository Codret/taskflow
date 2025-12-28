import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export default function Profile({ user, setCurrentUser, onLogout }) {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${API_URL}/api/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setProfile({ name: data.user.name, email: data.user.email });
      })
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/api/user/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser((prev) => ({ ...prev, name: profile.name }));
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoadingProfile(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return toast.error("Passwords do not match");

    setLoadingPassword(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/user/password`,
        { currentPassword: passwords.current, newPassword: passwords.new },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="profile-page max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={saveProfile} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loadingProfile}
        >
          {loadingProfile ? "Saving..." : "Save Profile"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={changePassword} className="mb-6 space-y-3">
        <input
          type="password"
          placeholder="Current Password"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwords.new}
          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwords.confirm}
          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loadingPassword}
        >
          {loadingPassword ? "Updating..." : "Change Password"}
        </button>
      </form>

      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
