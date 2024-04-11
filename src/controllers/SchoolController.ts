import { supabase } from '../supabase.js'

interface School {
  id: string
  created_at: string
  school_name: string
  level: string
  region: string
  district: string
  constituency: string
  traditional_authority: string
  village: string
}

// Function to fetch all schools
async function fetchAllSchools(): Promise<School[] | null> {
  try {
    const { data, error } = await supabase.from<School>('schools').select('*')
    if (error) {
      console.error('Error fetching schools:', error.message)
      return null
    }
    return data || []
  } catch (error) {
    console.error('Error fetching schools:', error.message)
    return null
  }
}

// Function to fetch a single school by ID
async function fetchSchoolById(id: string): Promise<School | null> {
  try {
    const { data, error } = await supabase.from<School>('schools').select('*').eq('id', id).single()
    if (error || !data) {
      console.error(`Error fetching school with ID ${id}:`, error?.message || 'School not found')
      return null
    }
    return data
  } catch (error) {
    console.error(`Error fetching school with ID ${id}:`, error.message)
    return null
  }
}

// Function to create a new school
async function createSchool(
  school_name: string,
  level: string,
  region: string,
  district: string,
  constituency: string,
  traditional_authority: string,
  village: string
): Promise<School | null> {
  try {
    const { data, error } = await supabase
      .from<School>('schools')
      .insert([
        { school_name, level, region, district, constituency, traditional_authority, village }
      ])
    if (error) {
      console.error('Error creating school:', error.message)
      return null
    }
    return data ? data[0] : null
  } catch (error) {
    console.error('Error creating school:', error.message)
    return null
  }
}

// Function to update an existing school by ID
async function updateSchoolById(id: string, updates: Partial<School>): Promise<School | null> {
  try {
    const { data, error } = await supabase.from<School>('schools').update(updates).eq('id', id)
    if (error) {
      console.error(`Error updating school with ID ${id}:`, error.message)
      return null
    }
    return data ? data[0] : null
  } catch (error) {
    console.error(`Error updating school with ID ${id}:`, error.message)
    return null
  }
}

// Function to delete a school by ID
async function deleteSchoolById(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from<School>('schools').delete().eq('id', id)
    if (error) {
      console.error(`Error deleting school with ID ${id}:`, error.message)
      return false // Deletion failed
    }
    return true // Deletion successful
  } catch (error) {
    console.error(`Error deleting school with ID ${id}:`, error.message)
    return false // Deletion failed
  }
}

export { fetchAllSchools, fetchSchoolById, createSchool, updateSchoolById, deleteSchoolById }
