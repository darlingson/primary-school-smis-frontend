import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from '#imports';
import School from '~/model/School';
import Class from '~/model/Class';
import Subject from '~/model/Subject';

export default defineEventHandler(async (event) => {
    let id = "";
    if (event.context.params !== undefined) {
        id = event.context.params.id;
    }

    try {
        const school = await School.findOne({ _id: id });
        if (!school) {
            return {
                success: false,
                message: 'School not found'
            };
        }

        const classes = await Class.find({ school: id });
        const classIds = classes.map(c => c._id);

        const subjects = await Subject.find({ class: { $in: classIds } });

        return {
            success: true,
            school,
            classes,
            subjects
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
});
