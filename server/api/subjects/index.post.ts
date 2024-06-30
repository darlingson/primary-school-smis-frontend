import Subject from "~/model/Subject";

export default defineEventHandler(async (event) => {
  //a subject has a name, class and type.
  //that is what we are expecting from the body

  try {
    const body = await readBody(event);
    const subject = new Subject({
      name: body.name,
      type: body.type,
      class: body.class
    });
    await subject.save();
    return {
      success: true,
      message: 'Subject added successfully'
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
