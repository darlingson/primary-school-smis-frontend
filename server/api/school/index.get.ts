import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from '#imports';
import School from '~/model/School';
export default defineEventHandler(async (event) => {
  try {
    const schools = await School.find({});
    if (!schools.length) {
        return {
            success: false,
            message: 'Schools not found'
        };
    }

    return {
      success: true,
      schools
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        error: error
      };
    }
  }
})
