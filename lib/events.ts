// Fired on `window` (CustomEvent<Job>) whenever a new job is successfully
// created via PostJobModal, so parts of the page that render the job list
// (e.g. JobsGrid) can update without a shared parent component.
export const JOB_CREATED_EVENT = "sachok:job-created";
