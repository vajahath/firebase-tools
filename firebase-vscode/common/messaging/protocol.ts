/**
 * @fileoverview Lists all possible messages that can be passed back and forth
 * between two environments (VScode and Webview)
 */

import { FirebaseProjectMetadata } from "../../../src/types/project";
import { FirebaseConfig } from  '../../../src/firebaseConfig';
import { FirebaseRC } from "../firebaserc";
import { User } from "../../../src/types/auth";
import { ServiceAccountUser } from "../types";

// Messages sent from Webview to extension
export interface WebviewToExtension {
  getEnv(): void;

  /* --- working with CLI: user management --- */
  getUsers(): void;
  addUser(): void;
  logout(email: string): void;

  /** Notify extension that current user has been changed. */
  requestChangeUser(user: User | ServiceAccountUser): void;

  /** Asks what projects are available for this user. */
  getProjects(email: string): void;

  /** Show a project picker. */
  projectPicker(projects: FirebaseProjectMetadata[]): void;

  /** Runs `firebase init hosting` command. */
  selectAndInitHostingFolder(
    projectId: string,
    email: string,
    singleAppSupport: boolean
  ): void;

  /** Runs `firebase deploy` for hosting. */
  hostingDeploy(): void;

  /** fetches a list of folders in the user's workspace. */
  getWorkspaceFolders(): void;

  /** get selected project either from firebaserc or last cached value (or workspace file) */
  getSelectedProject(): void;

  /** Fetches the entire firebase rc config file. If the file doesn't exist, then it will return a default value. */
  getFirebaseJson(): void;

  showMessage(msg: string, options?: {}): void;
}

// Messages sent from Extension to Webview
export interface ExtensionToWebview {
  notifyEnv(env: { isMonospace: boolean }): void;
  /** Called as a result of getUsers/addUser/logout calls */
  notifyUsers(users: User[]): void;
  notifyProjects(email: string, projects: FirebaseProjectMetadata[]): void;

  /** Called when a new project is selected */
  notifyProjectChanged(projectId: string): void;

  /**
   * This can potentially call multiple webviews to notify of user selection.
   */
  notifyUserChanged(email: string): void;

  notifyHostingFolderReady(projectId: string, folderPath: string): void;

  notifyHostingDeploy(
    success: boolean,
    consoleUrl: string | undefined,
    hostingUrl: string | undefined
  ): void;

  notifyWorkspaceFolders(folders: Array<String>): void;

  notifyFirebaseJson(firebaseJson: FirebaseConfig, firebaseRC: FirebaseRC): void;
}
