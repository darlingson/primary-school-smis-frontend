import Student from "~/model/Student"

export default defineEventHandler(async (event) => {
  //this endpoint returns all students from the school
  let id = ""
  if (event.context.params != undefined) {
      id = event.context.params.id;
  }
  try{
    const students = await Student.find({ school: id });
    return {
      success:true,
      message:"Students retrieved successfully",
      students
    }
  }
  catch(error){
    console.log(error)
    if(error instanceof Error){
      return{
        success:false,
        message:error.message,
        error:error
      }
    }
  }
})
