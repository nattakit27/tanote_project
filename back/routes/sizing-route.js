const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const sizingController = require('../controllers/sizing-controller')

router.get('/', authenticate, sizingController.getByUser)
router.get('/all-status', authenticate, sizingController.getAllStatus)
router.post('/', authenticate, sizingController.createSizing)
router.put('/:id', authenticate, sizingController.updateSizing)
router.delete('/:id', authenticate, sizingController.deleteSizing)

module.exports = router