import User from "~/model/User";

export default defineEventHandler(async (event) => {
  let id = ""
  if (event.context.params != undefined) {
      id = event.context.params.id;
      console.log("the id is " + id)
        //first we should get the teacher user information, then we should use the user id to retrieve subjects assigned to this teacher
  try {
    const teacher = await User.findOne({ _id: id });
    console.log(teacher)
    return {
        user_info: {
            _id: teacher._id,
            name: teacher.name,
            email: teacher.email,
            role: teacher.role,
            school: teacher.school
        }
    }
}
catch (error) {
    console.log(error)
    if (error instanceof Error) {
        return {
            success: false,
            message: error.message,
            error: error
        }
    }
}
  }

})
