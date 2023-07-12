export const EXAM_QUESTION_RADIO_TYPE = 'RADIO';
export const EXAM_QUESTION_TEXT_TYPE = 'TEXT';
export const EXAM_QUESTION_CHECKBOX_TYPE = 'CHECKBOX';

export const EXAM_ID_FIELD_ID = "id";
export const EXAM_TITLE_FIELD_ID = 'title';
export const EXAM_DURATION_FIELD_ID = 'duration';
export const EXAM_END_DATE_FIELD_ID = 'endDate';
export const EXAM_IMAGE_FIELD_ID = 'examImage';
export const EXAM_LEVEL_FIELD_ID = 'level';
export const EXAM_COURSES_FIELD_ID = 'courses';
export const EXAM_QUESTIONS_FIELD_ID = 'questions';
export const EXAM_TYPE_FIELD_ID = 'examType';
export const EXAM_INVITATION_FIELD_ID = "invitations";
export const EXAM_PASSPERCENTAGE_FIELD_ID = "passPercentage";

export const QUESTION_GENERATION_MODE_MANUAL = "MANUAL";
export const QUESTION_GENERATION_MODE_RANDOM = "RANDOM";
export const QUESTION_GENERATION_MODES = [QUESTION_GENERATION_MODE_MANUAL, QUESTION_GENERATION_MODE_RANDOM];
export const EXAM_INVITATION_MODE_USERS = "USERS";
export const EXAM_INVITATION_MODE_GROUP = "GROUP";
export const EXAM_INVITATION_MODE_TENANT = "TENANT";
export const EXAM_INVITATION_MODES = [EXAM_INVITATION_MODE_USERS, EXAM_INVITATION_MODE_GROUP, EXAM_INVITATION_MODE_TENANT];

export const EXAM_CREATION_STEPS = [
    "Enter details",
    "Select questions",
    "Create/Modify exam"
];

export const EXAM_INSTRUCTIONS_PATH = "/user/exams/instructions";
export const EXAM_PATH = "/user/exams";
export const EXAM_SESSION_ID_PATH = "/exam/session/:sessionId";
export const EXAM_REPORT_PATH = "/exam/report";
export const DEFAULT_IMAGE = "https://exams.edronalearning.com/Themes/themeone/assets/landing2/img/exam-01.png";
