export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const gradebook = new event.context.models.Gradebook({
      studentName: body.studentName,
      studentId: body.studentId,
      term: body.term,
      year: body.year,
      school: body.school,
      class: body.class
    })
    await gradebook.save()
    return {
      success: true,
      message: 'Gradebook added successfully'
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
