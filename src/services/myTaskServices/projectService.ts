// import Project, { IProject } from "../../models/mytask/projectModel";
// import mongoose, { Types } from "mongoose";
// import { User } from "../../models/user/userModel";

// export const createProject = async (name: string): Promise<IProject> => {
//   const project = new Project({ name, assignedEmployees: [] });
//   return await project.save();
// };

// export const getAllProjects = async (): Promise<IProject[]> => {
//   return await Project.find().populate("assignedEmployees");
// };

// export const getProjectById = async (id: string): Promise<IProject | null> => {
//   return await Project.findById(id).populate("assignedEmployees");
// };

// export const deleteProject = async (id: string): Promise<IProject | null> => {
//   return await Project.findByIdAndDelete(id);
// };

// /** Assign an employee to a project */
// // export const assignEmployeeToProject = async (
// //   projectId: string,
// //   employeeId: string,
// //   assignedBy: string
// // ) => {
// //   if (
// //     !mongoose.Types.ObjectId.isValid(projectId) ||
// //     !mongoose.Types.ObjectId.isValid(employeeId)
// //   ) {
// //     throw new Error("Invalid project or employee ID");
// //   }

// //   const project = await Project.findById(projectId);
// //   if (!project) {
// //     throw new Error("Project not found");
// //   }

// //   // Check if employee is already assigned
// //   const alreadyAssigned = project.assignedEmployees.some(
// //     (emp) => emp.employeeId.toString() === employeeId
// //   );
// //   if (alreadyAssigned) {
// //     throw new Error("Employee already assigned to this project");
// //   }

// //   project.assignedEmployees.push({
// //     employeeId: new mongoose.Types.ObjectId(employeeId),
// //     assignedBy,
// //   });
// //   await project.save();
// //   return await Project.findById(projectId).populate(
// //     "assignedEmployees.employeeId"
// //   );
// // };

// export const assignEmployeeToProject = async (
//   projectId: string,
//   employeeId: string,
//   assignedBy: string
// ) => {
//   if (
//     !mongoose.Types.ObjectId.isValid(projectId) ||
//     !mongoose.Types.ObjectId.isValid(employeeId)
//   ) {
//     throw new Error("Invalid project or employee ID");
//   }

//   const project = await Project.findById(projectId);
//   if (!project) {
//     throw new Error("Project not found");
//   }

//   // Check if employee is already assigned to the project
//   const alreadyAssigned = project.assignedEmployees.some(
//     (emp) => emp.employeeId.toString() === employeeId
//   );
//   if (alreadyAssigned) {
//     throw new Error("Employee already assigned to this project");
//   }

//   // Add employee to the project
//   project.assignedEmployees.push({
//     employeeId: new mongoose.Types.ObjectId(employeeId),
//     assignedBy,
//   });

//   // Update the Employee's `projects` field
//   const employee = await User.findById(employeeId);
//   if (!employee) {
//     throw new Error("Employee not found");
//   }

//   // Prevent adding the same project if it's already assigned to the employee
//   const alreadyAssignedToProject = employee.projects.some(
//     (projId) => projId.toString() === projectId
//   );
//   if (!alreadyAssignedToProject) {
//     employee.projects.push(new mongoose.Types.ObjectId(projectId));
//     await employee.save();
//   }

//   // Save the updated project
//   await project.save();

//   // Return the updated project with populated employee data
//   return await Project.findById(projectId).populate(
//     "assignedEmployees.employeeId"
//   );
// };

// /** Remove an employee from a project */
// // export const removeEmployeeFromProject = async (
// //   projectId: string,
// //   employeeId: string,
// //   removedBy: string
// // ) => {
// //   if (
// //     !mongoose.Types.ObjectId.isValid(projectId) ||
// //     !mongoose.Types.ObjectId.isValid(employeeId)
// //   ) {
// //     throw new Error("Invalid project or employee ID");
// //   }

// //   const project = await Project.findById(projectId);
// //   if (!project) {
// //     throw new Error("Project not found");
// //   }

// //   const employeeIndex = project.assignedEmployees.findIndex(
// //     (emp) => emp.employeeId.toString() === employeeId
// //   );
// //   if (employeeIndex === -1) {
// //     throw new Error("Employee not assigned to this project");
// //   }

// //   // Update the removedBy field before removing the employee
// //   project.assignedEmployees[employeeIndex].removedBy = removedBy;
// //   await project.save();

// //   // Now remove the employee
// //   project.assignedEmployees = project.assignedEmployees.filter(
// //     (emp) => emp.employeeId.toString() !== employeeId
// //   );
// //   return await project.save();
// // };

// export const removeEmployeeFromProject = async (
//   projectId: string,
//   employeeId: string,
//   removedBy: string
// ) => {
//   if (
//     !mongoose.Types.ObjectId.isValid(projectId) ||
//     !mongoose.Types.ObjectId.isValid(employeeId)
//   ) {
//     throw new Error("Invalid project or employee ID");
//   }

//   const project = await Project.findById(projectId);
//   if (!project) {
//     throw new Error("Project not found");
//   }

//   const employeeIndex = project.assignedEmployees.findIndex(
//     (emp) => emp.employeeId.toString() === employeeId
//   );
//   if (employeeIndex === -1) {
//     throw new Error("Employee not assigned to this project");
//   }

//   // Update the removedBy field before removing the employee
//   project.assignedEmployees[employeeIndex].removedBy = removedBy;

//   // Remove the employee from the project
//   project.assignedEmployees = project.assignedEmployees.filter(
//     (emp) => emp.employeeId.toString() !== employeeId
//   );
//   await project.save();

//   // Find the employee to remove the project from their list
//   const employee = await User.findById(employeeId);
//   if (!employee) {
//     throw new Error("Employee not found");
//   }

//   // Remove the project from the employee's projects list
//   employee.projects = employee.projects.filter(
//     (projId) => projId.toString() !== projectId
//   );
//   await employee.save();

//   return project; // Return the updated project
// };

import Project, { IProject } from "../../models/mytask/projectModel";
import mongoose from "mongoose";
import { User } from "../../models/user/userModel";
import { ErrorHandler } from "../../utils/errorHandler";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

export const createProject = async (name: string): Promise<IProject> => {
  const project = new Project({ name, assignedEmployees: [] });
  return await project.save();
};

export const getAllProjects = async (): Promise<IProject[]> => {
  return await Project.find().populate("assignedEmployees.employeeId");
};

export const getProjectById = async (id: string): Promise<IProject | null> => {
  return await Project.findById(id).populate("assignedEmployees.employeeId");
};

export const deleteProject = async (id: string): Promise<IProject | null> => {
  return await Project.findByIdAndDelete(id);
};

export const assignEmployeeToProject = async (
  projectId: string,
  employeeId: string,
  assignedBy: string
) => {
  if (
    !mongoose.Types.ObjectId.isValid(projectId) ||
    !mongoose.Types.ObjectId.isValid(employeeId)
  ) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ErrorHandler(404, ERROR_MESSAGES.PROJECT_NOT_FOUND);
  }

  const alreadyAssigned = project.assignedEmployees.some(
    (emp) => emp.employeeId.toString() === employeeId
  );
  if (alreadyAssigned) {
    throw new ErrorHandler(400, ERROR_MESSAGES.EMPLOYEE_ALREADY_ASSIGNED);
  }

  project.assignedEmployees.push({
    employeeId: new mongoose.Types.ObjectId(employeeId),
    assignedBy,
  });

  const employee = await User.findById(employeeId);
  if (!employee) {
    throw new ErrorHandler(404, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const alreadyAssignedToProject = employee.projects.some(
    (projId) => projId.toString() === projectId
  );
  if (!alreadyAssignedToProject) {
    employee.projects.push(new mongoose.Types.ObjectId(projectId));
    await employee.save();
  }

  await project.save();

  return await Project.findById(projectId).populate(
    "assignedEmployees.employeeId"
  );
};

export const removeEmployeeFromProject = async (
  projectId: string,
  employeeId: string,
  removedBy: string
): Promise<IProject> => {
  if (
    !mongoose.Types.ObjectId.isValid(projectId) ||
    !mongoose.Types.ObjectId.isValid(employeeId)
  ) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ErrorHandler(404, ERROR_MESSAGES.PROJECT_NOT_FOUND);
  }

  const employeeIndex = project.assignedEmployees.findIndex(
    (emp) => emp.employeeId.toString() === employeeId
  );
  if (employeeIndex === -1) {
    throw new ErrorHandler(400, ERROR_MESSAGES.EMPLOYEE_NOT_ASSIGNED);
  }

  project.assignedEmployees[employeeIndex].removedBy = removedBy;

  project.assignedEmployees = project.assignedEmployees.filter(
    (emp) => emp.employeeId.toString() !== employeeId
  );
  await project.save();

  const employee = await User.findById(employeeId);
  if (!employee) {
    throw new ErrorHandler(404, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  employee.projects = employee.projects.filter(
    (projId) => projId.toString() !== projectId
  );
  await employee.save();

  return project;
};
