import { Job } from '../interfaces';

const baseURL = `http://localhost:3000`;

const jobService = {

  getAllJobs(uid: string) {
    return fetch(`${baseURL}/list/${uid}`)

      .then(response => {
        if (response.status < 300) {
          return response.json()
        } else {
          console.log('error', response.status);
          return new Error(`There was an error`)
        }
      })
      .then(data => {
        console.log('datainfetch', data);
        return data
      })
      .catch(e => console.log(e)
      );
  },

  async createJob(job: Job) {
    const response = await fetch(`${baseURL}/add`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(job),
    });
    const data = await response.json();
    if (response.status >= 400) {
      throw new Error(data.message);
    }
    return data;
  },

  async updateJob(job: Job) {
    const { _id, company, position, status, date_applied, date_interview } = job;
    console.log('API', job);

    return await fetch(`${baseURL}/edit/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        _id: _id,
        company: company,
        position: position,
        status: status,
        date_applied: date_applied,
        date_interview: date_interview,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async deleteJob(id: string) {
    console.log('target url - delete', `${baseURL}/list/${id}`);

    return await fetch(`${baseURL}/list/${id}`, {
      method: 'DELETE',
    });
  },
};

export default jobService;