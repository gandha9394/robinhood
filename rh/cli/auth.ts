import { bold, green, red } from "colorette";
import { deleteAuthToken, deleteCurrentUser, getAuthToken, getCurrentUser, setAuthToken, setCurrentUser } from "../config.js";

export const checkAuthToken = () => {
    // Get current user
    const email = getCurrentUser();
    if(!email) {
        console.log(red(bold("Unauthenticated") + "\nPlease login using `rh login <email>` command"));
        process.exit();
    }

    const token = getAuthToken(email);
    if (!token) {
        console.log(red(bold("Unauthenticated") + "\nPlease login using `rh login <email>` command"));
        process.exit();
    }
    return token;
};

export const loginUser = (email: string) => {
    const token = getAuthToken(email);
    // TODO: Login flow

    // Dummy login
    if (!token) {
        setAuthToken(email, "hahaha")
    }
    setCurrentUser(email)
    console.log(green("Login successful for user: " + bold(email)));
};

export const logoutCurrentUser = () => {
    const email = getCurrentUser();
    if(email) {
        deleteAuthToken(email)
    } else {
        console.log(red(bold("No user found") + "\nPlease login using `rh login <email>` command"));
        process.exit();
    }
    deleteCurrentUser()
    console.log(green("Successfully logged out user: " + bold(email)));
};
