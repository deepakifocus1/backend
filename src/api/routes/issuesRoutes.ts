import express from "express";
import {
  createIssues,
  updateIssues,
  deleteIssues,
  fetchIssue,       // fetch issue by specific Id 
  fetchAllIssues,   // fetch all issues
  fetchIssues,      // fetch all issues with pagination feature
  fetchIssuesByEmployee,
  countIssuesByStatus,
  addCommentAndUpdateStatus,
  reassignIssue,
  reopenIssue,
  fetchIssuesByDepartment, 
  filterIssuesByDepartmentWithPriorityAndStatus,
  fetchTimeDurationFilteredIssues,
  upload as uploadHandler,
  list,
  deleteFile,
  viewIssue,
  withdrawIssue,
  addComment,
  fetchIssuesByClientName,
  countIssuesByDepartment,
  countIssuesByDepartmentStatusWise
} from "../controllers/issueController";
import { validateCommentAndStatus , validateReassignment, validateComments} from "../../middlewares/issueValidateRequest";
import { isAuthenticatedUser } from "../../middlewares/isAuthenticatedUser";
import  isAuthorizedUser  from "../../middlewares/isAuthorizedUser";
import { ROLE } from "../../constants/issueConstants";
import  uploadDocumentMiddleware  from "../../middlewares/uploadDocument";

const router = express.Router();

router.post("/create",isAuthenticatedUser,uploadDocumentMiddleware.array("files", 5),createIssues);
router.put("/update/:id",isAuthenticatedUser,updateIssues);
router.delete("/delete/:id",isAuthenticatedUser, deleteIssues);
router.get("/allIssues",isAuthenticatedUser, fetchAllIssues);
router.get("/",isAuthenticatedUser, fetchIssues);
router.get('/counts-by-department',isAuthenticatedUser,isAuthorizedUser(ROLE.SeniorManagement),countIssuesByDepartment)
router.get('/counts/department-status-wise/:department',isAuthenticatedUser,countIssuesByDepartmentStatusWise)
router.get("/count-status",isAuthenticatedUser,isAuthorizedUser(ROLE.SeniorManagement), countIssuesByStatus);
router.post('/:id/comment',isAuthenticatedUser, validateComments, addComment);
router.post("/status/:id", isAuthenticatedUser, isAuthorizedUser (
  ROLE.HR,
  ROLE.ITSupport,
  ROLE.Finance,
  ROLE.Admin,
  ROLE.Marketing,
  ROLE.Sales,
  ROLE.TAG,
  ROLE.SeniorManagement
) ,validateCommentAndStatus, addCommentAndUpdateStatus);
router.get("/department/:department", isAuthenticatedUser,fetchIssuesByDepartment);
router.get("/filter",isAuthenticatedUser,isAuthorizedUser(ROLE.SeniorManagement), fetchTimeDurationFilteredIssues);
router.get("/:id",isAuthenticatedUser, fetchIssue);
router.get("/my-issues/:employeeID", isAuthenticatedUser, fetchIssuesByEmployee);
router.put("/reassign/:id",isAuthenticatedUser, validateReassignment, reassignIssue);
router.put("/reopen/:id", isAuthenticatedUser,  reopenIssue);
router.get("/department/:department/filter",isAuthenticatedUser, filterIssuesByDepartmentWithPriorityAndStatus);
router.post("/upload",isAuthenticatedUser ,uploadDocumentMiddleware.array("files", 5), uploadHandler);
router.get("/documentList",isAuthenticatedUser ,list);
router.delete('/deleteDocument/:id', isAuthenticatedUser, deleteFile);
router.get("/view/:issueId",isAuthenticatedUser, viewIssue); 
router.put("/withdraw/:issueId", isAuthenticatedUser,withdrawIssue);
router.get('/client/:clientName', isAuthenticatedUser, fetchIssuesByClientName);

export default router;

