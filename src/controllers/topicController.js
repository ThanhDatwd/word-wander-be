/* eslint-disable quotes */

import { StatusCodes } from "http-status-codes";
import { topicService } from "~/services/topicService";
const createNew = async (req, res, next) => {
  try {
    const result = await topicService.createNew(req.body);
    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await topicService.getAll();
    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getDetails = async (req, res, next) => {
  try {
    const slug = req.params.id;
    const result = await topicService.getDetails(slug);
    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateOneById = async (req, res, next) => {
  try {
    const topicId = req.params.id;
    const result = await topicService.updateOneById(topicId, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateOrder = async (req, res, next) => {
  try {
    const topicId = req.params.id;
    const result = await topicService.updateOrder(topicId, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const topicController = {
  createNew,
  getAll,
  getDetails,
  updateOneById,
  updateOrder,
};
