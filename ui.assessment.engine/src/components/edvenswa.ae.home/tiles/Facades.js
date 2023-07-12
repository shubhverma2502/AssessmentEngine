import ExamIcon from '../../../assets/ae_exam.png';
import ReportIcon from '../../../assets/ae_report.png';
import PaidExamIcon from '../../../assets/ae_paid_exam.png';
import ManageUsers from '../../../assets/ae_manage_users.png';
import ManageExams from '../../../assets/ae_manage_exams.png';
import ManageTenants from '../../../assets/ae_tenant.png';
import ContentCreation from '../../../assets/ae_content.png';
import Analytics from '../../../assets/ae_overallanalytics.png';
import { MANAGE_EXAMS, MANAGE_TENANTS, MANAGE_USERS, PRACTICE_EXAMS, EXAM_TYPE_PRACTICE, EXAM_TYPE_ASSIGNED, ASSIGNED_EXAMS, EXAM_TYPE_ALL, EXAM_REPORT, REPORTS, CONTENT_CREATION, ANALYTICS, OVERALL_ANALYTICS } from '../constants/constants';

export const FACADES = [
    {
        id: PRACTICE_EXAMS,
        title: "Practice Exams",
        imageUrl: ExamIcon,
        imageAlt: "Practice Exams",
        navigateTo: "/user/exams",
        navigateState: { examType: EXAM_TYPE_PRACTICE },
        description: "AE practice exams improves your skills, makes you comfortable with the platform and allows you to better manage the time and duration."
    },
    {
        id: ASSIGNED_EXAMS,
        title: "Assigned Exams",
        imageUrl: PaidExamIcon,
        imageAlt: "Assigned Exams",
        navigateTo: "/user/exams",
        navigateState: { examType: EXAM_TYPE_ASSIGNED },
        description: "AE assigned exams created by either admin, your current or future organization to assess you for an employment or a training."
    },
    {
        id: REPORTS,
        title: "My Reports",
        imageUrl: ReportIcon,
        imageAlt: "My Reports",
        navigateTo: "/user/reports",
        navigateState: { examType: EXAM_REPORT },
        description: "Collective information of the past assinged or practice exams that are with finished status. You can view/download the merit certificate from each exam."
    },
    {
        id: MANAGE_TENANTS,
        title: "Manage Tenants",
        imageUrl: ManageTenants,
        imageAlt: "Manage Tenants",
        navigateTo: "/console/tenant",
        description: "Manage the tenants, groups and users into the single unit.",
    },
    {
        id: MANAGE_USERS,
        title: "Manage Users",
        imageUrl: ManageUsers,
        imageAlt: "Manage Users",
        navigateTo: "/console/users",
        description: "Search and manage the user state, modify the group and update the authority.",
    },
    {
        id: MANAGE_EXAMS,
        title: "Manage Exams",
        imageUrl: ManageExams,
        imageAlt: "Paid Exams",
        navigateTo: "/console/examtypes",
        navigateState: { examType: EXAM_TYPE_ALL },
        description: "Manage exam creation, modification, deletion and assignment to either user, group or tenant."
    },
    {
        id: CONTENT_CREATION,
        title: "Manage Content",
        imageUrl: ContentCreation,
        imageAlt: "Content Creation",
        navigateTo: "/content/dashboard",
        description: "Manage content creation. Create content either manual or using the file upload. Sample upload schema is available on each content type."
    },
    {
        id: OVERALL_ANALYTICS,
        title: "View Analytics",
        imageUrl: Analytics,
        imageAlt: "OVERALL ANALYTICS",
        navigateTo: "/console/dashboard",
        description: "Displays overall user Analytics. You can also see which user attempted how many exams."
    },
    // {
    //     id: ANALYTICS,
    //     title: "Analytics",
    //     imageUrl: Analytics,
    //     imageAlt: "Analytics",
    //     navigateTo: "/console/analytics",
    //     description: "System wide analytics -- count of active/in-active users, count of practical and assigned exams and more..."
    // }

]