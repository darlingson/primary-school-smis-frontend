import Grade from "~/model/Grade"

export default defineEventHandler(async (event) => {
  //get the grades of all students from a particular class from a particular school
  let schoolID = ""
  let classID = ""
  if (event.context.params != undefined) {
    schoolID = event.context.params.schoolID
    classID = event.context.params.classID
  }
  try {
    const grades = await Grade.find({ school: schoolID, class: classID })
    return {
      success: true,
      message: 'Grades retrieved successfully',
      grades
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
