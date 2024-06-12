/* eslint-disable quotes */

import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    goal: Joi.string().required().trim().strict(),
    slug: Joi.string().required().min(3).default(null).trim().strict().optional(),
    order: Joi.number().default(0).optional(),
    topic_ids: Joi.array()
      .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
      .default([]),
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
const updateOrder = async (req, res, next) => {
  const correctCondition = Joi.object({
    oldOrder: Joi.number().required(),
    newOrder: Joi.number().required(),
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
export const levelValidation = {
  createNew,
  updateOrder,
};
