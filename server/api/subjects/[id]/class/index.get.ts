import Class from "~/model/Class";
import Subject from "~/model/Subject";

export default defineEventHandler(async (event) => {
  let id = ""
  if (event.context.params != undefined) {
      id = event.context.params.id;
  }
  console.log("the id is " + id)
  try {
    const subjects = await Subject.find({ class: id });
    const classInfo = await Class.findOne({ _id: id });
    return {
        success: true,
        message: 'Subjects retrieved successfully',
        classInfo,
        subjects  
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
})
