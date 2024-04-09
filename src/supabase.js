import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function createStudentProfile(studentData) {
    const { first_name, last_name, date_of_birth, grade_level, parent_contact_info, academic_records, attendance_history, health_information } = studentData;

    try {
        const { data: student, error: studentError } = await supabase.from('students').insert({
            first_name,
            last_name,
            date_of_birth,
            grade_level
        }).single();

        if (studentError) {
            console.error('Error creating student profile:', studentError.message);
            return null;
        }

        const studentId = student.id;

        await supabase.from('parent_contact_info').insert(parent_contact_info.map(contact => ({ ...contact, student_id: studentId })));

        await supabase.from('academic_records').insert(academic_records.map(record => ({ ...record, student_id: studentId })));

        await supabase.from('attendance_history').insert(attendance_history.map(history => ({ ...history, student_id: studentId })));

        await supabase.from('health_information').insert(health_information.map(info => ({ ...info, student_id: studentId })));

        return student;
    } catch (error) {
        console.error('Error creating student profile:', error.message);
        return null;
    }
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