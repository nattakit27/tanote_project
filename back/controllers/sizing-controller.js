const db = require('../models/db')
const {Status} = require('@prisma/client')

exports.getByUser = async (req, res, next) => {
  try {
    const sizings = await db.sizing.findMany({
      where : { userId : req.user.id}
    })
    res.json({sizings})
  } catch (err) {
    next(err)
  }
}

exports.createSizing = async (req, res, next) => {
  // validate req.body
  const data = req.body
  try{
    const rs = await db.sizing.create({
       data : { ...data, userId : req.user.id}
    })
    res.json({ msg: 'Create OK' , result : rs })
  }catch(err) {
    next(err)
  }
}

exports.updateSizing = async (req, res, next) => {
  // validate req.params + req.body
  const {id} = req.params
  const data = req.body
  try {
    const rs = await db.sizing.update({
      data :  {...data},
      where: { id : +id , userId : req.user.id} 
    })
    res.json({msg: 'Update ok', result: rs})
  }catch(err){
    next(err)
  }
}

exports.deleteSizing = async (req, res, next) => {
  const {id} = req.params
  try {
    const rs = await db.sizing.delete({ where : {id : +id, userId: req.user.id}})
    res.json({msg: 'Delete ok', result : rs})
  }catch(err) {
    next(err)
  }
}

exports.getAllStatus = async (req, res, next) => {
  res.json({status: Object.values(Status)})
}