import Class from "~/model/Class";
import Subject from "~/model/Subject";

export default defineEventHandler(async (event) => {
  //this endpoint is used to create a new class
  //it will receive class details, it will also automatically generate 8 classes

  try {
    const body = await readBody(event);
    const subjectIds:string[] = []
    const newClass = new Class({
      name: body.name,
      school:body.school,
      subjects: subjectIds
    })
    for (let i = 1; i <= 8; i++) {
      const subject = new Subject({
        name: subjectNames[i-1].name,
        type: subjectNames[i-1].type,
        class: newClass._id
      })
      await subject.save();
      subjectIds.push(subject._id)
    }
    await newClass.save();
    return {
      success: true,
      message: 'Class added successfully'
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
interface subject{
  name:string
  type:string,
  class:string
}