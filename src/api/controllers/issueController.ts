import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import {
  createIssueService,
  updateIssueService,
  deleteIssueService,
  fetchAllIssuesService,   //   fetch all issues
  fetchIssuesService,      //   fetch all issues with pagination feature
  fetchIssueService,       //   fetch issue by specific Id 
  countIssuesByStatusService,
  addCommentAndUpdateStatusService,
  reassignIssueService,
  reopenIssueService,
  fetchIssuesByDepartmentService,
  fetchIssuesWithDurationFilterService,
  withdrawIssueService,
  addCommentService,
  fetchIssuesByClientNameService,
  fetchIssuesByEmployeeService,
  countByDepartmentService,
  countIssuesByDepartmentStatusWiseService,
} from "../../services/issuesService";
import { Status, Priority, IIssue } from "../../models/issues/issuesTypes";
import { Issue } from "../../models/issues/issuesModel";
import { UpdateIssuePayload } from "../../types/issueIndex";
import { SUCCESS_MESSAGES,ERROR_MESSAGES } from "../../constants/issueConstants";

import { MyData } from "../../models/myData/myDataModel";
import { documentUploadSchema } from "../../validations/issueValidation";
import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from "../../services/documentService";
import { ErrorHandler } from "../../utils/errorHandler";

export const createIssues = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {

      const issueData = req.body;
      const employeeId = req?.user?.employeeId;
      const name = req?.user?.name;

      const userFound = await MyData.findOne({ employeeId }).exec();
      if (!userFound) {
        return next(new ErrorHandler(400, ERROR_MESSAGES.USER_NOT_FOUND));
      }

      const client = userFound.currentEmployment[0]?.client;
      const projectName = userFound.currentEmployment[0]?.myProject;
      const userImage = userFound.profilePhoto;

      let documentUrls: string[] = [];
      if (req.files) { 
      const { error } = documentUploadSchema.validate({ files: req.files });
      if (error) {
        return next(new ErrorHandler(400, error.details[0].message));
      }

      for (const file of req.files as Express.Multer.File[]) {
        const document = await uploadDocument(file);
        documentUrls.push(document.url); 
      }
    }

      const newIssue = await createIssueService({
        ...issueData,
        name,
        employeeID: employeeId,
        client,
        projectName,
        userImage,
        documentUrls,
      });

      res.status(201).json({
        success: true,
        message: SUCCESS_MESSAGES.ISSUE_CREATED,
        data: newIssue,
      });
  }
)

export const updateIssues = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const issueId = req.params.id;
    const updateData = req.body;

    const updatedIssue = await updateIssueService(issueId, updateData);
    
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.ISSUE_UPDATED,
      data: updatedIssue,
    });
  }
);

export const deleteIssues = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const issueId = req.params.id;

    const deletedIssue = await deleteIssueService(issueId);

      res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.ISSUE_DELETED,
      data: deletedIssue,
    });
  }
);

//fetch all issues controller
export const fetchAllIssues = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const issues = await fetchAllIssuesService();

    res.status(200).json({
      success: true,
      data: issues,
    });
  }
);

//fetch all issues with pagination feature
export const fetchIssues = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { issues, totalCount } = await fetchIssuesService(page, limit);

    res.status(200).json({
      success: true,
      data: issues,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalIssues: totalCount,
      },
    });
  }
);

//fetch all issue by specific employeeId
export const fetchIssuesByEmployee = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { employeeID } = req.params;

    let page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
 
    const status = req.query.status as string | undefined;

    const { issues, totalCount, totalPages } = await fetchIssuesByEmployeeService(employeeID, page, limit, status);

    if (page > totalPages) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
        pagination: {
          currentPage: page,
          totalPages,
          totalIssues: totalCount,
        },
      });
    }
    
    res.status(200).json({
      success: true,
      data: issues,
      pagination: {
        currentPage: page,
        totalPages,
        totalIssues: totalCount,
      },
    });
  }
);

//fetch issue by specific issue id
export const fetchIssue = catchAsyncErrors (async (req: Request, res: Response, next: NextFunction) => {
  const issueId = req.params.id;

    const issue = await fetchIssueService(issueId);
   
    res.status(200).json({
    success: true,
    data: issue
    });
});

// View issue with full description
export const viewIssue = catchAsyncErrors (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const issueId = req.params.issueId;

    const issue = await fetchIssueService(issueId);
   
    res.status(200).json({
    success: true,
    data: issue,
  })
});

// Count issues by status
export const countIssuesByStatus = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const issueCounts = await countIssuesByStatusService();

    res.status(200).json({
      success: true,
      data: issueCounts,
    });
  }
);

export const addCommentAndUpdateStatus = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const issueId = req.params.id;
    const { status, comment  } = req.body as UpdateIssuePayload;
    
    const employeeId = req?.user?.employeeId!;
    const commentedBy = req?.user?.name!;

    const userFound = await MyData.findOne({ employeeId }).exec();
    const userImage = userFound?.profilePhoto?.url!;
    const updateData: Partial<IIssue & UpdateIssuePayload> = {
      status: status as Status,
    };

    if (comment) {
      updateData.comment = comment;
    }

    const updatedIssue = await addCommentAndUpdateStatusService(
      issueId,
      status as Status,
      commentedBy,
      userImage,
      employeeId,
      updateData
    );

    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.UPDATED_COMMENT_STATUS,
      data: updatedIssue,
    });
  }
);

export const reassignIssue = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const issueId = req?.params?.id;
    const { department, name, emailId} = req.body;
    const assignedByEmployeeId = req?.user?.employeeId!;

    const reassignedIssue = await reassignIssueService(issueId, {
      department,
      name,
      emailId,
      assignedByEmployeeId
    });

    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.ISSUE_REASSIGN,
      data:reassignedIssue ,
    });
  }
);

export const reopenIssue = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const issueId = req?.params?.id;

    let documentUrls: string[] = [];
    if (req.files) {
      const { error } = documentUploadSchema.validate({ files: req.files });
      if (error) {
        return next(new ErrorHandler(400, error.details[0].message));
      }

      for (const file of req.files as Express.Multer.File[]) {
        const document = await uploadDocument(file);
        documentUrls.push(document.url);
      }
    }

    const reopenedIssue = await reopenIssueService(issueId, documentUrls);

    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.ISSUE_REOPEN,
      data: reopenedIssue,
    });
  }
);

export const fetchIssuesByDepartment = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const department = req.params.department;
    
    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { issues, totalCount } = await fetchIssuesByDepartmentService(department, page, limit);

    res.status(200).json({
      success: true,
      data: issues,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalIssues: totalCount,
      },
    });
  }
);

export const fetchTimeDurationFilteredIssues = catchAsyncErrors(
  async (req: Request, res: Response , next: NextFunction) => {
    const { duration } = req.query;
    const filters = {
      duration: duration as string,
    };

    const issues = await fetchIssuesWithDurationFilterService(filters);

      res.status(200).json({
      success: true,
      data: issues,
    });
  }
);

export const filterIssuesByDepartmentWithPriorityAndStatus = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const department = req.params.department;
    const priority = req.query.priority as Priority | null;
    const status = req.query.status as Status | null;

    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { issues, totalCount } = await fetchIssuesByDepartmentService(
      department,
      page,
      limit,
      priority,
      status
    );

    res.status(200).json({
      success: true,
      data: issues,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalIssues: totalCount,
      },
    });
  }
);

export const upload = catchAsyncErrors(async (req: Request, res: Response): Promise<void> => {
  if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
    throw new ErrorHandler(400, ERROR_MESSAGES.FILE_NOT_UPLOADED);
  }

  const files = req.files as Express.Multer.File[];

  const uploadedDocuments = [];
  for (const file of files) {
    const { error } = documentUploadSchema.validate({ files });
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    const document = await uploadDocument(file);
    uploadedDocuments.push(document);
  }

  res.status(201).json({
    message: SUCCESS_MESSAGES.FILES_UPLOADED_SUCCESSFULLY,
    documents: uploadedDocuments,
  });
});

export const list = catchAsyncErrors ( async (req: Request, res: Response): Promise<void> => {
  
    const documents = await getDocuments();
    res.status(200).json(documents);
  
});

export const deleteFile = catchAsyncErrors ( async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  await deleteDocument(id);
  res.status(200).json({ message: SUCCESS_MESSAGES.FILE_DELETED });
  
});

export const withdrawIssue = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const issueId = req?.params?.issueId;
    const employeeId = req?.user?.employeeId;

    const issue = await withdrawIssueService(issueId, employeeId ); 
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.ISSUE_WITHDRAWN,
      data: issue,
    });
   
  }
);

export const addComment = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const issueId = req?.params?.id;
    const { comment } = req?.body as { comment: string };

    if (!comment) {
      next(new ErrorHandler(400, ERROR_MESSAGES.COMMENT_REQUIRED));
    }

    const employeeId = req?.user?.employeeId!;
    const commentedBy = req?.user?.name!;

    const userFound = await MyData.findOne({ employeeId }).exec();
    if (!userFound) {
      return next(new ErrorHandler(400, ERROR_MESSAGES.USER_NOT_FOUND));
    }

    const userImage = userFound?.profilePhoto?.url!;

    const updatedIssue = await addCommentService(
      issueId,
      comment,
      commentedBy,
      userImage
    );
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.UPDATED_STATUS,
      data: updatedIssue,
    });
  }
);

export const fetchIssuesByClientName = catchAsyncErrors(
  async(req : Request, res : Response, next : NextFunction) => {
    
    const { clientName } = req?.params;
    const issues = await fetchIssuesByClientNameService(clientName);

    res.status(200).json({
      success : true,
      message : SUCCESS_MESSAGES.ISSUE_FETCHED,
      data : issues,
      
    });
  }
);

export const countIssuesByDepartment = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const counts = await countByDepartmentService();

    res.status(200).json({
      success: true,
      data: counts,
    });

  }
);

export const countIssuesByDepartmentStatusWise = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const department = req.params.department;
    const result = await countIssuesByDepartmentStatusWiseService(department);

    res.status(200).json({
      success: true,
      data: result.issues,
      counts: result.counts,
      totalIssues: result.totalIssues,
      highPriorityCount: result.highPriorityCount,
    });
  }
);