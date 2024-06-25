import User from "~/model/User";
import School from "../../../../model/School";
import Class from "~/model/Class";
import Subject from "~/model/Subject";

export default defineEventHandler(async (event) => {
  console.log("adding school")
  //when adding school, subject and classes should be auto generated to make the system more user friendly

  try {
    const body = await readBody(event);
    const school = new School({
      name: body.name,
      type: body.type,
      address: body.address,
      location: body.location,
      email: body.email,
      phone: body.phone,
      adminEmail: body.adminEmail
    });
    await school.save();
    //school has been added lets generate 8 classes names standard 1 to 8
    for (let i = 1; i <= 8; i++) {
      const className = `Standard ${i}`;
      const classModel = new Class({
        name: className,
        school: school._id
      });
      subjectNames.forEach(async (subject) => {
        const subjectModel = new Subject({
          name: subject.name,
          type: subject.type,
          class: classModel._id
        })
        await subjectModel.save();
        classModel.subjects.push(subjectModel._id)
      })
      await classModel.save();
    }
    const user = await User.findOne({ email: body.adminEmail });
    console.log(user)
    if (user) {
      user.school = school._id;
      await user.save();
      console.log(user)
    }
    console.log(school)
    return {
      success: true,
      message: 'School added successfully'
    }
  } catch (error) {
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

//subjects array that contains the common subject taught in primary schools in Malawi
const subjectNames = [
  {name:"Mathematics",type:"science"},
  {name:"English", type:"language"},
  {name:"Chichewa", type:"language"},
  {name:"Social Studies", type:"socialStudies"},
  {name:"Agriculture", type:"science"},
  {name:"Science and Technology", type:"science"},
  {name:"Life Skills", type:"humanities"},
  {name:"Bible Knowledge", type:"humanities"},
]