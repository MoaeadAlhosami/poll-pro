export const endPoints = {
  //poll
  createPoll: "/poll",
  updatePoll: (id) => `/poll/${id}`,
  getAllPolls: "/poll",
  getPollById: (id) => `/poll/${id}`,
  deletePoll: (id) => `/poll/${id}`,

  //questions
  updateQuestion: (id) => `/question/${id}`,

  //solve
  solve: "/solve",
  getSolveById: (id) => `/solve/${id}`,

  //auth
  auth: "/auth",
};
