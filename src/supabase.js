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

export async function createParentContactInfo(parentContactInfo) {
    const { data, error } = await supabase.from('parent_contact_info').insert(parentContactInfo);

    if (error) {
        console.error('Error creating parent contact info:', error.message);
        return null;
    }

    return data;
}

export async function fetchParentContactInfo(studentId) {
    const { data, error } = await supabase
        .from('parent_contact_info')
        .select('*')
        .eq('student_id', studentId);

    if (error) {
        console.error('Error fetching parent contact info:', error.message);
        return null;
    }

    return data;
}

export async function updateParentContactInfo(contactId, updatedData) {
    const { data, error } = await supabase
        .from('parent_contact_info')
        .update(updatedData)
        .eq('id', contactId);

    if (error) {
        console.error('Error updating parent contact info:', error.message);
        return null;
    }

    return data;
}

export async function deleteParentContactInfo(contactId) {
    const { error } = await supabase
        .from('parent_contact_info')
        .delete()
        .eq('id', contactId);

    if (error) {
        console.error('Error deleting parent contact info:', error.message);
        return false;
    }

    return true;
}

export async function createAcademicRecord(academicRecord) {
    const { data, error } = await supabase.from('academic_records').insert(academicRecord);

    if (error) {
        console.error('Error creating academic record:', error.message);
        return null;
    }

    return data;
}

export async function fetchAcademicRecords(studentId) {
    const { data, error } = await supabase
        .from('academic_records')
        .select('*')
        .eq('student_id', studentId);

    if (error) {
        console.error('Error fetching academic records:', error.message);
        return null;
    }

    return data;
}

export async function updateAcademicRecord(recordId, updatedData) {
    const { data, error } = await supabase
        .from('academic_records')
        .update(updatedData)
        .eq('id', recordId);

    if (error) {
        console.error('Error updating academic record:', error.message);
        return null;
    }

    return data;
}

export async function deleteAcademicRecord(recordId) {
    const { error } = await supabase
        .from('academic_records')
        .delete()
        .eq('id', recordId);

    if (error) {
        console.error('Error deleting academic record:', error.message);
        return false;
    }

    return true;
}


export async function createAttendanceHistory(attendanceHistory) {
    const { data, error } = await supabase.from('attendance_history').insert(attendanceHistory);

    if (error) {
        console.error('Error creating attendance history:', error.message);
        return null;
    }

    return data;
}

export async function fetchAttendanceHistory(studentId) {
    const { data, error } = await supabase
        .from('attendance_history')
        .select('*')
        .eq('student_id', studentId);

    if (error) {
        console.error('Error fetching attendance history:', error.message);
        return null;
    }

    return data;
}

export async function updateAttendanceHistory(historyId, updatedData) {
    const { data, error } = await supabase
        .from('attendance_history')
        .update(updatedData)
        .eq('id', historyId);

    if (error) {
        console.error('Error updating attendance history:', error.message);
        return null;
    }

    return data;
}

export async function deleteAttendanceHistory(historyId) {
    const { error } = await supabase
        .from('attendance_history')
        .delete()
        .eq('id', historyId);

    if (error) {
        console.error('Error deleting attendance history:', error.message);
        return false;
    }

    return true;
}

export async function createHealthInformation(healthInformation) {
    const { data, error } = await supabase.from('health_information').insert(healthInformation);

    if (error) {
        console.error('Error creating health information:', error.message);
        return null;
    }

    return data;
}

export async function fetchHealthInformation(studentId) {
    const { data, error } = await supabase
        .from('health_information')
        .select('*')
        .eq('student_id', studentId);

    if (error) {
        console.error('Error fetching health information:', error.message);
        return null;
    }

    return data;
}

export async function updateHealthInformation(infoId, updatedData) {
    const { data, error } = await supabase
        .from('health_information')
        .update(updatedData)
        .eq('id', infoId);

    if (error) {
        console.error('Error updating health information:', error.message);
        return null;
    }

    return data;
}

export async function deleteHealthInformation(infoId) {
    const { error } = await supabase
        .from('health_information')
        .delete()
        .eq('id', infoId);

    if (error) {
        console.error('Error deleting health information:', error.message);
        return false;
    }

    return true;
}


//school crud functions
async function fetchAllSchools() {
    try {
        const { data, error } = await supabase
            .from('schools')
            .select('*');
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error fetching schools:', error.message);
        return null;
    }
}

// Function to fetch a single school by ID
async function fetchSchoolById(id) {
    try {
        const { data, error } = await supabase
            .from('schools')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error(`Error fetching school with ID ${id}:`, error.message);
        return null;
    }
}

// Function to create a new school
async function createSchool(name, location) {
    try {
        const { data, error } = await supabase
            .from('schools')
            .insert([{ name, location }]);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error creating school:', error.message);
        return null;
    }
}

// Function to update an existing school by ID
async function updateSchoolById(id, updates) {
    try {
        const { data, error } = await supabase
            .from('schools')
            .update(updates)
            .eq('id', id);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error(`Error updating school with ID ${id}:`, error.message);
        return null;
    }
}

// Function to delete a school by ID
async function deleteSchoolById(id) {
    try {
        const { error } = await supabase
            .from('schools')
            .delete()
            .eq('id', id);
        if (error) {
            throw error;
        }
        return true; // Deletion successful
    } catch (error) {
        console.error(`Error deleting school with ID ${id}:`, error.message);
        return false; // Deletion failed
    }
}

export { fetchAllSchools, fetchSchoolById, createSchool, updateSchoolById, deleteSchoolById };
