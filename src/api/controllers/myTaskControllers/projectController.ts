import { Request, Response, NextFunction } from "express";
import * as projectService from "../../../services/myTaskServices/projectService";
import { ErrorHandler } from "../../../utils/errorHandler";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";
import { SUCCESS_MESSAGE } from "../../../constants/message";
import { catchAsyncErrors } from "../../../middlewares/catchAsyncErrors";

export const createProject = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const project = await projectService.createProject(name);
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.PROJECT_CREATED,
      data: project,
    });
  }
);

export const getAllProjects = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const projects = await projectService.getAllProjects();
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.PROJECTS_RETRIEVED,
      data: projects,
    });
  }
);

export const getProjectById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      throw new ErrorHandler(404, ERROR_MESSAGES.PROJECT_NOT_FOUND);
    }
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.PROJECT_RETRIEVED,
      data: project,
    });
  }
);

export const deleteProject = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const project = await projectService.deleteProject(req.params.id);
    if (!project) {
      throw new ErrorHandler(404, ERROR_MESSAGES.PROJECT_NOT_FOUND);
    }
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.PROJECT_DELETED,
    });
  }
);

export const assignEmployeeController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, employeeId, assignedBy } = req.body;

    if (!projectId || !employeeId || !assignedBy) {
      throw new ErrorHandler(400, ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
    }

    const updatedProject = await projectService.assignEmployeeToProject(
      projectId,
      employeeId,
      assignedBy
    );

    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.EMPLOYEE_ASSIGNED,
      data: updatedProject,
    });
  }
);

export const removeEmployee = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, employeeId, removedBy } = req.body;

    const project = await projectService.removeEmployeeFromProject(
      projectId,
      employeeId,
      removedBy
    );

    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.EMPLOYEE_REMOVED,
      data: project,
    });
  }
);
