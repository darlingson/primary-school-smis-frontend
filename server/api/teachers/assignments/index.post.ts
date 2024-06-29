import TeacherSubject from "~/model/TeacherSubject"
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const teacherSubject = new TeacherSubject({
      teacher: body.teacher,
      subject: {
        id: body.subject.id,
        name: body.subject.name
      },
      class: {
        id: body.class.id,
        name: body.class.name
      },
      school: {
        id: body.school.id,
        name: body.school.name
      },
      Term: body.term,
      Year: body.year,
      AcademicYear: body.academic_year
    })

    await teacherSubject.save();
    return {
      success: true,
      message: 'Assignment created successfully'
    }
  } catch (error) {
    let errorMessage = 'An error occurred during assignment creation';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.log(error);
    }
    return {
      success: false,
      message: errorMessage || 'An error occurred during assignment creation'
    };
  }
})
