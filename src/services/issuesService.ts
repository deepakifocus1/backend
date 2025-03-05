import { FilterParams, UpdateIssuePayload } from "../types/issueIndex";
import { Issue, Sequence } from "../models/issues/issuesModel";
import {
  IComment,
  IIssue,
  Status,
  Priority,
} from "../models/issues/issuesTypes";
import {
  OPEN,
  CLOSED,
  PENDING,
  INPROGRESS,
  DECLINE,
  COMPLETED,
  ERROR_MESSAGES,
} from "../constants/issueConstants";
import { ErrorHandler } from "../utils/errorHandler";

const allowedInitialStatuses = [Status.Open, Status.Closed];
const allowedUpdateStatuses = [Status.Open, Status.Closed];
const allowedCommentStatuses = [
  Status.Pending,
  Status.Decline,
  Status.InProgress,
  Status.Completed,
];
const validDepartments = ["HR", "Finance", "IT Support", "Admin", "TAG", "Sales", "Marketing", "Senior Management"];

export const getNextSequenceValue = async (sequenceName: string) => {
  const sequence = await Sequence.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  ).exec();
  return sequence.value;
};

export const createIssueService = async (
  issuePayload: any
): Promise<IIssue> => {
  if (!allowedInitialStatuses.includes(issuePayload.status)) {
    throw new ErrorHandler(
      400,
      `Status must be one of: ${allowedInitialStatuses.join(", ")}`
    );
  }

  // Generate issue ID
  const sequenceValue = await getNextSequenceValue("issueId");
  const issueId = `IFS${sequenceValue.toString().padStart(9, "0")}`;

  // assignedTo object exists and has department property
  const assignedTo =
    issuePayload.assignedTo && issuePayload.assignedTo.department
      ? { department: issuePayload.assignedTo.department }
      : {};

  const issueInstance: IIssue = new Issue({
    ...issuePayload,
    issueId,
    assignedTo,
    documentUrls: issuePayload.documentUrls || [],
  });
  try {
    await issueInstance.save();
  } catch (error) {
    throw new ErrorHandler(500, ERROR_MESSAGES.ISSUE_FAILED);
  }
  return issueInstance;
};

export const updateIssueService = async (
  issueId: string,
  updatePayload: Partial<IIssue> 
): Promise<IIssue | null> => {
  if (
    updatePayload.status &&
    !allowedUpdateStatuses.includes(updatePayload.status)
  ) {
    throw new ErrorHandler(
      400,
      `Status must be one of: ${allowedUpdateStatuses.join(", ")}`
    );
  }
  const issueInstance = await Issue.findById(issueId).exec();
  if (!issueInstance) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }

  issueInstance.closedAt =
    updatePayload.status === CLOSED ? new Date() : issueInstance.closedAt;

  Object.assign(issueInstance, updatePayload);
  await issueInstance.save();
  return issueInstance;
};

export const deleteIssueService = async (
  issueId: string
): Promise<IIssue | null> => {
  const issueInstance = await Issue.findByIdAndDelete(issueId).exec();
  if (!issueInstance) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }
  return issueInstance;
};

//fetch all issues
export const fetchAllIssuesService = async (): Promise<IIssue[]> => {
  try {
    const issues = await Issue.find();
    return issues;
  } catch (error) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }
};

//fetch all issues with pagination feature
export const fetchIssuesService = async (page: number, limit: number): Promise<{ issues: IIssue[]; totalCount: number }> => {
  try {
    const skip = (page - 1) * limit;
    const totalCount = await Issue.countDocuments();

    const issues = await Issue.find()
      .skip(skip)
      .limit(limit)
      .exec();

    return { issues, totalCount };
  } catch (error) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }
};

export const fetchIssuesByEmployeeService = async (
  employeeID: string,
  page: number,
  limit: number,
  status?: string
): Promise<{ issues: IIssue[]; totalCount: number; totalPages: number }> => {
  try {
   
    const query: any = { employeeID };
    
    if (status) {
      query.status = status;
    }

    const totalCount = await Issue.countDocuments(query);
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));

    let issues: IIssue[] = [];
    if (page <= totalPages) {
      const skip = (page - 1) * limit;
      issues = await Issue.find(query)
        .skip(skip)
        .limit(limit)
        .exec();
    }
    
    return { issues, totalCount, totalPages };
  } catch (error) {
    throw error;
  }
};

//fetch issue by specific issue id
export const fetchIssueService = async (
  issueId: string
): Promise<IIssue | null> => {
  try {
    const issue = await Issue.findOne({ issueId: issueId }).exec();
    return issue;
  } catch (error) {
    throw new ErrorHandler(
      500,
      `Error fetching issue with issue ID ${issueId}`
    );
  }
};

// Count issues by status
export const countIssuesByStatusService = async () => {
  try {
    const openCount = await Issue.countDocuments({ status: OPEN }).exec();
    const closedCount = await Issue.countDocuments({ status: CLOSED }).exec();
    const pendingCount = await Issue.countDocuments({ status: PENDING }).exec();
    const inProgressCount = await Issue.countDocuments({
      status: INPROGRESS,
    }).exec();
    const declineCount = await Issue.countDocuments({ status: DECLINE }).exec();
    const completedCount = await Issue.countDocuments({
      status: COMPLETED,
    }).exec();

    return {
      open: openCount,
      closed: closedCount,
      pending: pendingCount,
      inProgress: inProgressCount,
      decline: declineCount,
      completed: completedCount,
    };
  } catch (error) {
    throw error;
  }
};

export const addCommentAndUpdateStatusService = async (
  issueId: string,
  status: Status,
  commentedBy: string,
  userImage: string,
  commenterEmployeeId: string,
  updatePayload: Partial<IIssue & UpdateIssuePayload>
): Promise<IIssue | null> => {
  const { comment } = updatePayload;

  if (status && !allowedCommentStatuses.includes(status)) {
    throw new ErrorHandler(500, ERROR_MESSAGES.INVALID_STATUS);
  }

  const issueInstance = await Issue.findById(issueId).exec();
  if (!issueInstance) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }
  if (issueInstance.employeeID === commenterEmployeeId) {
    throw new ErrorHandler(403, ERROR_MESSAGES.SAME_EMPLOYEE_RESTRICTION);
  }
  if (comment) {
    const commentPayload: IComment = {
      status,
      comment: comment,
      commentedBy: commentedBy,
      userImage: userImage,
      commentedAt: new Date(),
    };

    issueInstance.comments.push(commentPayload);
  }

  issueInstance.status = status || issueInstance.status;

  const savedIssue = await issueInstance.save();

  return savedIssue;
};

export const reassignIssueService = async (
  issueId: string,
  assigneePayload: {
    status?: Status;
    department: string;
    name: string;
    emailId: string;
    assignedByEmployeeId: string;
  }
): Promise<IIssue | null> => {
  const issueInstance = await Issue.findById(issueId).exec();
  if (!issueInstance) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }

  if (issueInstance.employeeID === assigneePayload.assignedByEmployeeId) {
    throw new ErrorHandler(403, ERROR_MESSAGES.SAME_EMPLOYEE_RESTRICTION);
  }

  issueInstance.assignedTo = assigneePayload;
  issueInstance.status = assigneePayload.status || Status.Pending;

  await issueInstance.save();

  return issueInstance;
};

export const reopenIssueService = async (
  issueId: string,
  documentUrls: string[] = []
): Promise<IIssue | null> => {
  const issueInstance = await Issue.findById(issueId).exec();
  if (!issueInstance || issueInstance.status !== Status.Closed) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }

  issueInstance.status = Status.Reopened;
  if (documentUrls.length > 0) {
    issueInstance.documentUrls = documentUrls;
  }

  await issueInstance.save();

  return issueInstance;
};

export const fetchIssuesByDepartmentService = async (
  department: string,
  page: number,
  limit: number,
  priority?: Priority | null,
  status?: Status | null
): Promise<{ issues: IIssue[]; totalCount: number }> => {
  try {
    let query: any = { "assignedTo.department": department };

    if (priority !== undefined && priority !== null) {
      query.priority = priority;
    }

    if (status !== undefined && status !== null) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const totalCount = await Issue.countDocuments(query);

    const issues = await Issue.find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    return { issues, totalCount };
  } catch (error) {
    throw error;
  }
};


export const fetchIssuesWithDurationFilterService = async (
  filters: FilterParams
): Promise<IIssue[]> => {
  const dateRange: { $lt?: Date; $gte?: Date } = {};

  switch (filters.duration) {
    case "24 hours":
      dateRange.$gte = subtractHoursFromCurrentDate(24);
      break;
    case "1-3 days":
      dateRange.$gte = subtractHoursFromCurrentDate(72);
      dateRange.$lt = subtractHoursFromCurrentDate(24);
      break;
    case "4-7 days":
      dateRange.$gte = subtractHoursFromCurrentDate(168);
      dateRange.$lt = subtractHoursFromCurrentDate(96);
      break;
    case "Above 7 days":
      dateRange.$lt = subtractHoursFromCurrentDate(168);
      break;
    default:
      break;
  }

  const issues = await Issue.find({
    status: Status.Open,
    createdAt: dateRange,
  }).exec();
  if (!issues || issues.length === 0) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }
  return issues;
};

const subtractHoursFromCurrentDate = (hours: number): Date => {
  return new Date(new Date().getTime() - hours * 60 * 60 * 1000);
};

export const withdrawIssueService = async (
  issueId: string,
  employeeId: string | undefined,
): Promise<IIssue> => {
  const issue = await Issue.findOne({ issueId }).exec();

  if (!issue) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }

  if (issue.employeeID !== employeeId) {
    throw new ErrorHandler(400, ERROR_MESSAGES.UNAUTHORIZED_PERSON);
  }

  const nonWithdrawableStatuses = [
    Status.Closed,
    Status.Decline,
    Status.InProgress,
    Status.Completed,
  ];
  if (nonWithdrawableStatuses.includes(issue.status)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.CANNOT_WITHDRAW_ISSUE);
  }
  issue.status = Status.Withdrawn;

  await issue.save();
  return issue;
};

export const addCommentService = async (
  issueId: string,
  updatedComment: string,
  commentedBy: string,
  userImage: string
): Promise<IIssue | null> => {
  const issueInstance = await Issue.findById(issueId).exec();
  if (!issueInstance) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ISSUE_NOT_FOUND);
  }

  const commentPayload: IComment = {
    status: issueInstance.status,
    comment: updatedComment,
    commentedBy: commentedBy,
    userImage: userImage,
    commentedAt: new Date(),
  };

  issueInstance.comments.push(commentPayload);

  await issueInstance.save();

  return issueInstance;
};

export const fetchIssuesByClientNameService = async (clientName: string) => {
  const issues = await Issue.find({ client: clientName }).exec();
  if (!issues.length) {
    throw new ErrorHandler(404, ERROR_MESSAGES.CLIENT_NOT_FOUND);
  }
  return issues;
};

export const countByDepartmentService = async () => {
  const counts = await Issue.aggregate([
    {
      $group: {
        _id: "$assignedTo.department",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        department: "$_id",
        count: 1,
      },
    },
  ]);
  return counts;
}

export const countIssuesByDepartmentStatusWiseService = async (
  department: string,
  priority?: Priority | null,
  status?: Status | null
): Promise<{ issues: IIssue[], counts: Record<string, number>, totalIssues: number, highPriorityCount: number }> => {
    let query: any = { "assignedTo.department": department };

    if (priority) {
      query.priority = priority;
    }

    if (status) {
      query.status = status;
    }

    const issues = await Issue.find(query).exec();
    const totalIssues = issues.length;

    const highPriorityCount = await Issue.countDocuments({
      "assignedTo.department": department,
      priority: "High"
    });

    const countsAggregation = await Issue.aggregate([
      { $match: query },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const counts = countsAggregation.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {
      Open: 0,
      Closed: 0,
      Pending: 0,
      Decline: 0,
      InProgress: 0,
      Completed: 0,
      Withdrawn: 0
    });

    return { issues, counts, totalIssues, highPriorityCount };
  
};
