import TeacherSubject from "~/model/TeacherSubject";
export default defineEventHandler(async (event) => {
    let id = ""
    if (event.context.params != undefined) {
        id = event.context.params.id;
        console.log("the id is " + id)
        try{
            const assignments = await TeacherSubject.find({ teacher: id });
            return {
                success: true,
                assignments
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
    }
})