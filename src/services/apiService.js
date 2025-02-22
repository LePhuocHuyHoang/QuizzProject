import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post(`v1/participant`, data);
};
const getAllUsers = () => {
  return axios.get("v1/participant/all");
};
const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put(`v1/participant`, data);
};
const deleteUser = (userId) => {
  return axios.delete("v1/participant", { data: { id: userId } });
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(`v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (email, password) => {
  return axios.post(`v1/login`, {
    email: email,
    password: password,
    delay: 3000,
  });
};
const postRegister = (email, password, username) => {
  return axios.post(`v1/register`, {
    email: email,
    password: password,
    username: username,
  });
};
const getQuizByUser = () => {
  return axios.get("v1/quiz-by-participant");
};
const getDataQuiz = (id) => {
  return axios.get(`v1/questions-by-quiz?quizId=${id}`);
};
const postSubmitQuiz = (data) => {
  return axios.post(`v1/quiz-submit`, { ...data });
};
const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.post(`v1/quiz`, data);
};
const getAllQuizForAdmin = () => {
  return axios.get("v1/quiz/all");
};
const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.put(`v1/quiz`, data);
};
const deleteQuiz = (quizId) => {
  return axios.delete(`v1/quiz/${quizId}`);
};
const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post(`v1/question`, data);
};
const postCreateNewAnswerForQuestion = (
  question_id,
  description,
  correct_answer
) => {
  return axios.post(`v1/answer`, { correct_answer, description, question_id });
};
const postAssignQuiz = (quizId, userId) => {
  return axios.post(`v1/quiz-assign-to-user`, {
    quizId,
    userId,
  });
};
const getQuizWithQA = (quizId) => {
  return axios.get(`v1/quiz-with-qa/${quizId}`);
};
const postUpsertQA = (data) => {
  return axios.post(`v1/quiz-upsert-qa`, { ...data });
};
const logOut = (email, refresh_token) => {
  return axios.post(`v1/logout`, {
    email,
    refresh_token,
  });
};
export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  logOut,
};
