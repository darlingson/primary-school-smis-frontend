import Class from "~/model/Class";
import Subject from "~/model/Subject";
import School from "~/model/School"; // Assuming you have a School model

export default defineEventHandler(async (event) => {
  let id = "";
  if (event.context.params !== undefined) {
    id = event.context.params.id;
  }

  // Fetch the school information
  const school = await School.findById(id);

  // Fetch the classes for the given school ID
  const classes = await Class.find({ school: id });

  // Fetch the subjects for the fetched classes
  const classIds = classes.map(c => c._id);
  const subjects = await Subject.find({ class: { $in: classIds } });

  // Append the school and class information to each subject object
  const subjectsWithDetails = subjects.map(subject => {
    const classInfo = classes.find(c => c._id.equals(subject.class));
    return {
      ...subject.toObject(),
      school: {
        _id: school._id,
        name: school.name,
      },
      class: {
        _id: classInfo._id,
        name: classInfo.name,
      },
    };
  });

  return {
    subjects: subjectsWithDetails,
  };
});
