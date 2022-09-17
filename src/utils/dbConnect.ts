import { connect } from "mongoose";

export const dbConnect = async () => {
  try {
    const dbUri = process.env.DB_URI || "";
    await connect(dbUri);
    console.log("Database connection Successful !!");
  } catch (err: any) {
    console.log("Something Went Wrong !!", err);
  }
};
