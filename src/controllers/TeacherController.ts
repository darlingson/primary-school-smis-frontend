import { supabase } from '../supabase.js'
import type { Teacher } from '../components/interfaces/Teacher'

// Function to fetch all schools
async function fetchAllTeachers(): Promise<Teacher[] | null> {
  try {
    const { data, error } = await supabase.from<Teacher>('teachers').select('*')
    if (error) {
      console.error('Error fetching teachers:', error.message)
      return null
    }
    return data || []
  } catch (error: any) {
    console.error('Error fetching teachers:', error.message)
    return null
  }
}

async function fetchAllTeachersBySchoolId(school_id: string): Promise<Teacher[] | null> {
  try {
    const { data, error } = await supabase
      .from<Teacher>('teachers')
      .select('*')
      .eq('school_id', school_id)
    if (error) {
      console.error('Error fetching teachers:', error.message)
      return null
    }
    return data || []
  } catch (error: any) {
    console.error('Error fetching teachers:', error.message)
    return null
  }
}

async function fetchTeacherById(id: string): Promise<Teacher | null> {
  try {
    const { data, error } = await supabase
      .from<Teacher>('teachers')
      .select('*')
      .eq('id', id)
      .single()
    if (error || !data) {
      console.error(`Error fetching teacher with ID ${id}:`, error?.message || 'Teacher not found')
      return null
    }
    return data
  } catch (error: any) {
    console.error(`Error fetching school with ID ${id}:`, error.message)
    return null
  }
}

async function createTeacher(
  f_name: string,
  l_name: string,
  sex: string,
  school_id: string
): Promise<Teacher | null> {
  try {
    const { data, error } = await supabase
      .from<Teacher>('teachers')
      .insert([{ f_name, l_name, sex, school_id }])
    if (error) {
      console.error('Error creating teacher:', error.message)
      return null
    }
    console.log(data)
    return data ? data[0] : null
  } catch (error: any) {
    console.error('Error creating teacher:', error.message)
    return null
  }
}

async function updateTeacherById(id: string, updates: Partial<Teacher>): Promise<Teacher | null> {
  try {
    const { data, error } = await supabase.from<Teacher>('schools').update(updates).eq('id', id)
    if (error) {
      console.error(`Error updating school with ID ${id}:`, error.message)
      return null
    }
    return data ? data[0] : null
  } catch (error: any) {
    console.error(`Error updating school with ID ${id}:`, error.message)
    return null
  }
}

async function deleteTeacherById(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from<Teacher>('schools').delete().eq('id', id)
    if (error) {
      console.error(`Error deleting teacher with ID ${id}:`, error.message)
      return false // Deletion failed
    }
    return true // Deletion successful
  } catch (error: any) {
    console.error(`Error deleting teacher with ID ${id}:`, error.message)
    return false // Deletion failed
  }
}

export {
  fetchAllTeachers,
  fetchTeacherById,
  createTeacher,
  updateTeacherById,
  deleteTeacherById,
  fetchAllTeachersBySchoolId
}
