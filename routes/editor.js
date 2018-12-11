const express = require('express');
const router = express.Router();
const fs = require('fs')
const editorData = JSON.parse(fs.readFileSync('./blogData.json'))
router.get('/editor/:id',(req,res)=>
{
  const id = req.params.id;
  if(id in editorData)
  {
      const latexData = editorData[id];
      return res.json(
          {
              success:true,
              data:{
                  title:latexData.title,
                  latex: latexData.latex,
              }
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

router.post('/editor/upload',(req,res) =>
{
    const uploadData = req.body;
    const { id } = uploadData;
    const { title } = uploadData;
    const { latex } = uploadData;
    if(id in editorData)
    {
        return res.json(
            {
                success:false,
                message:'Id already used'
            }
        )
    }
    else{
        editorData[id] = {
            title:title,
            body:latex
        };
        fs.writeFileSync('./blogData.json',JSON.stringify(editorData,null,2));
        return res.json({
            success:true,
            message:'Upload successful'
        })
    }
})

module.exports = router;