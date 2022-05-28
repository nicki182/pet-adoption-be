import express from 'express'
import sendData from '../index';
import Controller from '@animal/controller';
const router = express.Router()
router.get('/petList',async (req, res) => {
  const animals = await Controller.getAllAnimals()
  sendData(res, animals)
})
export default router
