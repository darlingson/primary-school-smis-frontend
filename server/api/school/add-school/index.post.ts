import User from "~/model/User";
import School from "../../../../model/School";

export default defineEventHandler(async (event) => {
  console.log("adding school")
  try {
    const body = await readBody(event);
    const school = new School({
      name: body.name,
      type: body.type,
      address: body.address,
      location: body.location,
      email: body.email,
      phone: body.phone,
      adminEmail: body.adminEmail
    });
    await school.save();
    const user = await User.findOne({ email: body.adminEmail });
    console.log(user)
    if (user) {
      user.school = school._id;
      await user.save();
      console.log(user)
    }
    console.log(school)
    return {
      success: true,
      message: 'School added successfully'
    }
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        error: error
      }
    }
  }
})