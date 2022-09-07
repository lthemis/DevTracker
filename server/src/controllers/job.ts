import { Job } from '../model/jobs';
import { RequestHandler } from 'express';

//Find all jobs
export const retrieveJobs: RequestHandler = async (req, res) => {
  try {
    const { uid } = req.params;
    const jobs = await Job.find({ uid: uid });
    res.send(jobs);
  } catch (error) {
    res.status(404).send({ error, message: 'Sorry, nothing found' });
  }
};

//Post a new job
export const createJob: RequestHandler = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    res.status(200).send(newJob);
  } catch (error) {
    if (!req.body.company || !req.body.position || !req.body.status) {
      res.status(404).send({ error, message: 'Input field is missing' });
    }
  }
};

//Update Job information
export const updateJob: RequestHandler = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updated = await Job.findOneAndUpdate({ _id: jobId }, req.body);
    res.status(200).send(updated);
  } catch (error) {
    res
      .status(500)
      .send({ error, message: "Sorry, Job post can't be updated" });
  }
};

// Delete job post
export const removeJob: RequestHandler = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedJob = await Job.findByIdAndDelete({ _id: jobId });
    res.status(204).send({ deletedJob, message: 'Job has been deleted' });
  } catch (error) {
    res
      .status(500)
      .send({ error, message: "Sorry, Job post can't be deleted" });
  }
};
