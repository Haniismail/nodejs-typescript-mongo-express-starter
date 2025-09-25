import asyncHandler from "../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import fetchCountries from "../../helpers/fetchCountries";

export const getcountries = asyncHandler(async (req: ProtectedRequest, res) => {

  fetchCountries();
  //throw error  if there is no response
  return new SuccessResponse("success", {}).send(res);
});
