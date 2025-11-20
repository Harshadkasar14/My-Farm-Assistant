const UserSchema = new mongoose.Schema({
  uid: String,
  firstName: String,
  lastName: String,
  email: String,
  role: String,

  settings: {
    language: { type: String, default: "EN" },
    notificationsEnabled: Boolean,
    backupEnabled: Boolean,
    notificationPermission: String,
    weekStart: String,
    lastSync: Date,
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
