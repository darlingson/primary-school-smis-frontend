import Class from "~/model/Class";

export default defineEventHandler(async (event) => {
  let id = ""
  if (event.context.params != undefined) {
      id = event.context.params.id;
  }
  //get all the classes that belong to this school
  try {
    const classes = await Class.find({ school: id });
    return {
        success: true,
        message: 'Classes retrieved successfully',
        classes
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
