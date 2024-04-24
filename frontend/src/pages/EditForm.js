
import React from 'react';
import DropdownMenu from '../components/EditFormPage/DropdownMenu';
import { useParams } from "react-router-dom";
function EditForm() {
  const { formId, userId } = useParams();
  return (
    <div >

      <DropdownMenu formId={formId} userId={userId}/>
    </div>
    
  );
}

export default EditForm;
