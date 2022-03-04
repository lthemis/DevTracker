import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../service/jobService";

const EditForm = ({ jobs }) => {
  const { id } = useParams();
  const [updatedJob, setUpdatedJob] = useState(
    jobs.find((job) => job.id === id)
  );

  const editHandler = async (e) => {
    e.preventDefault();
    const { company, position, status } = e.target;
    console.log(company.value, position.value, status.value);
    setUpdatedJob({
      id: id,
      company: company.value,
      position: position.value,
      status: status.value,
    });

    jobService
      .updateJob(id, company.value, position.value, status.value)
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  };

  //   const inputHandler = (e) => {
  //     e.preventDefault();
  // const value = e.target.value;
  // setJob({
  //   ...updatedJob,
  //   [e.target.name]: value,
  // });
  //   };

  return (
    <div>
      <h4>Edit your job</h4>
      <form onSubmit={editHandler}>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            defaultValue={updatedJob.company}
            // value={job.company}
            // onChange={inputHandler}
          />
          <label htmlFor="position">Position</label>
          <input
            type="text"
            name="position"
            defaultValue={updatedJob.position}
            // value={job.position}
            // onChange={inputHandler}
          />
          <label htmlFor="status">Status</label>
          <select
            name="status"
            defaultValue={updatedJob.status}
            // value={job.status}
            // onChange={inputHandler}
          >
            <option value="interested">interested</option>
            <option value="pending">pending</option>
            <option value="ghosted">ghosted</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
            <option value="accepted">accepted</option>
          </select>
          <button>EDIT</button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
