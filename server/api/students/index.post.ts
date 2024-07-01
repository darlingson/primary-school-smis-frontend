import Student from "~/model/Student";
export default defineEventHandler(async (event) => {
  try{
    const body = await readBody(event);
    const student = new Student({
      name: body.name,
      school: body.school,
      class: body.class,
      homeAddress: body.homeAddress,
      guardian: body.guardian,
      guardianPhone: body.guardianPhone,
      guardianEmail: body.guardianEmail
    });
    await student.save();
    return {
      success: true,
      message: 'Student added successfully'
    }
  }
  catch(error){
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
