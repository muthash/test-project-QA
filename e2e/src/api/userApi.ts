import { APIRequestContext, APIResponse } from "@playwright/test";

export async function registerUser(request: APIRequestContext, username: string, password: string): Promise<APIResponse> {
  return await request.post("/Account/v1/User", {
    data: { password: password, userName: username },
  });
  // res.json() returns { userID, username, books }
}

export async function generateToken(request: APIRequestContext, username: string, password: string): Promise<APIResponse> {
  return await request.post("/Account/v1/GenerateToken", {
    data: { password: password, userName: username },
  });
  // res.json() returns { token, expires, status, result }
}

export async function loginUser(request: APIRequestContext, username: string, password: string): Promise<APIResponse> {
  return await request.post("/Account/v1/Login", {
    data: { password: password, userName: username },
  });
  // res.json() returns { userId, username, password, token, expires, created_date, isActive }
}

export async function deleteUser(request: APIRequestContext, userID: string, token: string): Promise<APIResponse> {
  return await request.delete(`/Account/v1/User/${userID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
