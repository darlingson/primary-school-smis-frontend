import User from "~/model/User";

export default defineEventHandler(async (event) => {
    const user = await User.find();
    return {
        users: user
    }
});  