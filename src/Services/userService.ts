import User from "../Models/userModel";
import argon2 from "argon2";
import TokenService from "./tokenService";


class UserService {
  private tokenService = new TokenService();
  async registerUser(
    name: string,
    email: string,
    username: string,
    password: string,
  ) {
    const existingUser = await User.findOne({
      where: { email: email },
    });
    if (existingUser) {
      throw new Error("email already exists");
    }
    const existingUsername = await User.findOne({
      where: {
        username: username,
      },
    });
    if (existingUsername) {
      throw new Error("username already exists");
    }
    const hashedPassword = await argon2.hash(password)
    const user = await User.create({name,username, email, password:hashedPassword})
    return user
  }
  async loginUser(
    username: string | undefined,
    email: string | undefined,
    password: string
) {
    const whereCondition = username
        ? { username: username }
        : { email: email };

    const user = await User.findOne({
        where: whereCondition
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await argon2.verify(
        user.password,
        password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    const accessToken = this.tokenService.generateAccessToken(
    user.id,
    user.role
);

const refreshToken = this.tokenService.generateRefreshToken(
    user.id
);

    return {accessToken,refreshToken};
}
async deleteUser(userId: number) {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role === "ADMIN") {
        throw new Error("Admin cannot be deleted");
    }

    await user.destroy();

    return {
        message: "User deleted successfully"
    };
}
}

export default UserService;
