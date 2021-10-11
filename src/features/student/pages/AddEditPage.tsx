import { ChevronLeft } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Box from '@mui/system/Box';
import studentApi from 'api/studentApi';
import { Student } from 'models/student';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { toast } from 'react-toastify';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);

  const [student, setStudent] = useState<Student>();

  const history = useHistory();

  useEffect(() => {
    if (!studentId) return;
    // IFFE
    (async () => {
      try {
        const data: Student = await studentApi.getByid(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [studentId]);

  const initialValue: Student = {
    name: '',
    city: '',
    age: '',
    mark: '',
    gender: 'male',
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValue: Student) => {
    console.log('formValue: ', formValue);
    if (isEdit) {
      await studentApi.updated(formValue);
    } else {
      await studentApi.add(formValue);
    }
    const messahe = 'Save student sussessfull';
    toast.success(messahe);
    history.push(`/admin/students`);
  };

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
