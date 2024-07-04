import Grade from "~/model/Grade"

export default defineEventHandler(async (event) => {
  // get the grades of a particular student
  let studentID = ""
  if (event.context.params != undefined) {
    studentID = event.context.params.studentID
  }
  try {
    const grades = await Grade.find({ student: studentID })
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
