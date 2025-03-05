export const ASSIGNEES = [
  "Unassigned",
  "HR",
  "Finance",
  "IT Support",
  "Admin",
  "TAG",
  "Sales",
  "Marketing",
  "Senior Management",
];
export const PRIORITIES = ["High", "Medium", "Low"];
export const STATUSES = [
  "Open",
  "Closed",
  "Reopened",
  "Pending",
  "Decline",
  "InProgress",
  "Completed",
  "Withdrawn",
];
export const OPEN = "Open";
export const CLOSED = "Closed";
export const PENDING = "Pending";
export const INPROGRESS = "InProgress";
export const DECLINE = "Decline";
export const COMPLETED = "Completed";

export const ROLE = {
  Employee: "Employee",
  HR: "HR",
  Finance: "Finance",
  ITSupport: "IT Support",
  Admin: "Admin",
  TAG: "TAG",
  Sales: "Sales",
  Marketing: "Marketing",
  SeniorManagement: "Senior Management",
};

export const SUCCESS_MESSAGES = {
  ISSUE_CREATED: "Issue created successfully ",
  ISSUE_UPDATED: "Issue updated successfully ",
  ISSUE_DELETED: "Issue deleted successfully ",
  ISSUE_REOPEN: "Issue reopened successfully ",
  ISSUE_WITHDRAWN: "Issue withdrawn successfully ",
  ISSUE_REASSIGN: "Issue reassigned successfully",
  UPDATED_COMMENT_STATUS: "Comment and status updated successfully",
  FILE_DELETED: "File deleted successfully",
  UPDATED_STATUS: "Status added successfully ",
  ISSUE_FETCHED: "Issue fetched successfully",
  FILES_UPLOADED_SUCCESSFULLY:"Files uploaded successfully!",
};

export const ERROR_MESSAGES = {
  ISSUE_FAILED: "Failed to create issue",
  INVALID_INPUT: "Invalid input provided.",
  USER_NOT_FOUND: "User not found.",
  COMMENT_REQUIRED: "Comment is required.",
  COMMENT_REQUIRED_FOR_DECLINE: "Comment is required for decline the issue",
  REASSIGN_COMMENT_REQUIRED: "Comment is required to reassign the issue",
  SERVER_ERROR: "An error occurred on the server. Please try again later.",
  PERMISSION_DENIED: "You do not have permission to perform this action.",
  CONNECTION_FAILED:
    "Failed to connect to the server. Please check your internet connection.",
  UNKNOWN_ERROR: "An unknown error occurred. Please contact support.",
  ISSUE_NOT_FOUND: "Issue not found.",
  UNAUTHORIZED_PERSON: "You are not authorized to withdraw this issue.",
  FETCH_ISSUE: "Error fetching issues for department",
  FILE_NOT_PROVIDED: "File not provided",
  INVALID_STATUS: "Invalid status for adding comment and updating status",
  CANNOT_WITHDRAW_ISSUE:
    "Issue cannot be withdrawn when status is Closed,Decline,InProgress,Completed ",
  CLIENT_REQUIRED: "Client name is required",
  CLIENT_NOT_FOUND: "Client name not found",
  SAME_EMPLOYEE_RESTRICTION: "Same employee can not resolve the issue",
  FILE_NOT_UPLOADED:"No files uploaded.",
};

export const DOCUMENT_FOLDER = "Document";
