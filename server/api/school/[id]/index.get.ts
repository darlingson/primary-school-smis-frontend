import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from '#imports';
import School from '~/model/School';
export default defineEventHandler(async (event) => {
    let id = ""
    if (event.context.params != undefined) {
        id = event.context.params.id;
    }
    try {
        const school = await School.findOne({ _id: id });
        return {
            school
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