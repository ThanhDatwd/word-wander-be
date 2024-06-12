/* eslint-disable quotes */

import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      "string.min": `"title" should have a minimum length of {#limit}`,
      "any.required": `"title" is a required field`,
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid("public", "private").required(),
  });
  try {
    // abortEarly: dừng validate ngay khi gặp lỗi đầu tiên
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};
export const boardValidation = {
  createNew,
};
