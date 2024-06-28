import TeacherSubject from "~/model/TeacherSubject"
export default defineEventHandler(async (event) => {
  const body = await readBody(event);  
try {
    const teacherSubject = new TeacherSubject({
      teacher: body.teacher_id,
      subject: {
        id: body.subject_id,
        name: body.subject_name
      },
      class:{
        id: body.class_id,
        name: body.class_name
      },
      school:{
        id: body.school_id,
        name: body.school_name
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
  }
  return {
    success: false,
    message: errorMessage || 'An error occurred during assignment creation'
  };
}
})
