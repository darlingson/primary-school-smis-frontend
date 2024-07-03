import Grade from "~/model/Grade"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const grades = new Grade({
      grade: body.grade,
      subject: body.subject,
      class: body.class,
      school: body.school,
      date: body.date
    })
    await grades.save()
    return {
      success: true,
      message: 'Grade added successfully'
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
