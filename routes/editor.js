const express = require('express');
const router = express.Router();
const fs = require('fs')
const editorData = JSON.parse(fs.readFileSync('./blogData.json'))
router.get('/blog/:id',(req,res)=>
{
  const id = req.params.id;
  if(id in editorData)
  {
      const latexData = editorData[id];
      return res.json(
          {
              success:true,
              data:latexData
          }
      )
  }
  else
  {
      return res.json(
          {
              success:false,
              message:'Content not found'
          }
      )
      
  }
});


export default router;