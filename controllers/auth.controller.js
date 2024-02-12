import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "../utils/genToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    // if the passwords do not match logic
    if (password != confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }

    // find userName if already exist invalidate the signUp
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // api Url : https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // generate token
      genToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log("Error in singUp controller", error.message);
    res.status(500).json({
      error: "Internal Server error unable to sign up the user",
    });
  }
};


export const login = ()=>{

}

export const logout = ()=>{
    
}