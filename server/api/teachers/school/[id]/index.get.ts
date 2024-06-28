import User from "~/model/User";

export default defineEventHandler(async (event) => {
  let id = ""//this is the school id
  if (event.context.params != undefined) {
    id = event.context.params.id;  
  } 

  try {
    const teachers = await User.find({ school: id });
    //we are finding all teachers that belong to the the admin's school
    return {
      success: true,
      teachers
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
