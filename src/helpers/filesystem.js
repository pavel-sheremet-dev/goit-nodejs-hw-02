const fs = require('fs').promises;
const path = require('path');
const { config } = require('../config');

const replaceFile = async (oldPath, newPath) => {
  try {
    await fs.rename(oldPath, newPath);
  } catch (error) {
    try {
      await fs.unlink(oldPath);
      throw error;
    } catch (error) {
      error.message = 'Avatar not uploaded';
      throw error;
    }
  }
};

const removeOldFileFromPublic = async pathUrl => {
  if (!pathUrl) return;
  const staticPath = config.getDirPath().static;
  const filePath = path.join(staticPath, pathUrl);
  try {
    await fs.unlink(filePath);
  } catch (error) {}
};

exports.fsOperations = { replaceFile, removeOldFileFromPublic };
