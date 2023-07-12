import ContentCreation from '../../../assets/ae_content1.png';
import FileUpload from '../../../assets/ae_file_upload.png';
import Questions from '../../../assets/ae_questions.png';
import ManageQuestions from '../../../assets/ae_manage_questions.png';
import PaidExamIcon from '../../../assets/ae_paid_exam.png';
import ExamIcon from '../../../assets/ae_exam.png';
import Analytics from '../../../assets/ae_analytics.png';
import ExamAnalysisicon from '../../../assets/ae_examanalysis.png';
import { ANALYTICS, ASSIGNED_EXAMS, CONTENT_CREATION, EXAM_ANALYSIS, EXAM_TYPE_ASSIGNED, EXAM_TYPE_PRACTICE, PRACTICE_EXAMS, QUESTIONS_CREATION, QUESTION_CREATION } from '../../edvenswa.ae.home/constants/constants'

export const contentTiles = [{
    id: QUESTION_CREATION,
    title: "Manage Questions",
    imageUrl: ManageQuestions,
    imageAlt: "Content Creation",
    navigateTo: "/content/dashboard/managequestion",
    description: "Manage question creation, modification."
}
// {
//     id: CONTENT_CREATION,
//     title: "Manage Content",
//     imageUrl: ContentCreation,
//     imageAlt: "Content Creation",
//     navigateTo: "/content/dashboard/#",
//     description: "Manage content creation, modification."
// }
];

export const questionsTiles = [{
    id: QUESTION_CREATION,
    title: "Create questions manually",
    imageUrl: Questions,
    imageAlt: "Content Creation",
    navigateTo: "/content/dashboard/managequestion/question",
    description: "Manage question creation, modification."
},
{
    id: QUESTIONS_CREATION,
    title: "Create questions using file upload",
    imageUrl: FileUpload,
    imageAlt: "Content Creation",
    navigateTo: "/content/dashboard/managequestion/fileupload",
    description: "Create questions from file."
}];

export const EXAM_TILES = [
    {
        id: PRACTICE_EXAMS,
        title: "Practice Exams",
        imageUrl: ExamIcon,
        imageAlt: "Practice Exams",
        navigateTo: "/console/examtypes/exams",
        navigateState: { examType: EXAM_TYPE_PRACTICE },
        description: "AE practice exams improves your skills, makes you comfortable with the platform and allows you to better manage the time and duration."
    },
    {
        id: ASSIGNED_EXAMS,
        title: "Assigned Exams",
        imageUrl: PaidExamIcon,
        imageAlt: "Assigned Exams",
        navigateTo: "/console/examtypes/exams",
        navigateState: { examType: EXAM_TYPE_ASSIGNED },
        description: "AE assigned exams created by either admin, your current or future organization to assess you for an employment or a training."
    }
]
export const ANALYTICS_TILES = [
    {
        id: ANALYTICS,
        title: "Analytics",
        imageUrl: Analytics,
        imageAlt: "Practice Exams",
        navigateTo: "/console/dashboard/analytics",
        description: "It shows you the analytics of the users."
    },
    {
        id: EXAM_ANALYSIS,
        title: "Exam Analysis",
        imageUrl: ExamAnalysisicon,
        imageAlt: "Assigned Exams",
        navigateTo: "/console/dashboard/examanalysis",
        description: "AE assigned exams created by either admin, your current or future organization to assess you for an employment or a training."
    }
]