"use client"
import AttendanceForms from '@/components/AttendanceForms';
import React from 'react';


const AttendanceTable = () => {

  return (
    <div className='overflow-y-auto custom-scrollbar'>
      <AttendanceForms />
    </div>
  );
};

export default AttendanceTable;