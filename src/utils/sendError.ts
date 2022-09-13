import { Response } from "express";

const sendError: SendError = ({ message, res, status, extra }) => {
  const treatedError = { ...extra, message };

  return res.status(status).json(treatedError);
};

type SendError = (props: {
  message: string;
  status: number;
  res: Response;
  extra?: Record<string, any>;
}) => Response;

export default sendError;
