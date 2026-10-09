
require("dotenv").config();
const mongoose = require("mongoose");
const Faculty = require("../models/Faculty");

const facultyAccounts = [
  {
    userId: "Alex123",
    name: "Alex",
    department: "Academic Team"
  },
  {
    userId: "Ram123",
    name: "Ram",
    department: "Academic Team"
  }
];

async function seed() {
  const uri =
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/eduwatch";

  await mongoose.connect(uri);

  for (const account of facultyAccounts) {
    const userId = account.userId.trim().toUpperCase();

    await Faculty.updateOne(
      { userId },
      {
        $set: {
          name: account.name,
          department: account.department
        }
      },
      { upsert: true }
    );

    console.log(`Faculty account ready: ${userId}`);
  }

  await mongoose.disconnect();
  console.log("All faculty accounts are ready.");
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
