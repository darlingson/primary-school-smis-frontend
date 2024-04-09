import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function createStudentProfile(studentData) {
    const { data, error } = await supabase.from('students').insert(studentData);

    if (error) {
        console.error('Error creating student profile:', error.message);
        return null;
    }

    return data;
}

export async function fetchStudentProfiles() {
    const { data, error } = await supabase.from('students').select('*');

    if (error) {
        console.error('Error fetching student profiles:', error.message);
        return null;
    }

    return data;
}

export async function updateStudentProfile(studentId, updatedData) {
    const { data, error } = await supabase
        .from('students')
        .update(updatedData)
        .eq('id', studentId);

    if (error) {
        console.error('Error updating student profile:', error.message);
        return null;
    }

    return data;
}

export async function deleteStudentProfile(studentId) {
    const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentId);

    if (error) {
        console.error('Error deleting student profile:', error.message);
        return false;
    }

    return true;
}