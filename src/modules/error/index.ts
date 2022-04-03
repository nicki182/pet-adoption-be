import logger from '../logger';
class CustomError extends Error {
  constructor(error: string) {
    super(error);
    logger.error(error);
  }
}
export default CustomError;
