const express = require('express');
const fs = require('fs');
const router = express.Router();


router.get('/blog',(req,res)=>{

	return res.json(
	{
		message:'kek'
	})
})

router.post('/blogparser',(req,res) =>
{
    console.log("here")
    data =  req.body.content;
    parsedText = ''
    for(var i = 0 ; i < data.length;i++)
    {
        currentCharacter = data[i]
        if (currentCharacter == '$'){
            var j = i + 1;
            equationText = ''
            while ( data[j] !== '$')
            {
                equationText = equationText + data[j]
                j = j + 1
            }
           
            full_eq_text = "<Mathjax.Context input =\'tex\'> <div> " +
            "<Mathjax.Node inline>{" + equationText  + " }</Mathjax.Node>"
            i = j
            parsedText = parsedText + full_eq_text
        }
        
        parsedText = parsedText + currentCharacter
        console.log("i=" + i)
    }
   return res.json (
        {
            success:true,
            message:parsedText
        }
    )

})
module.exports = router;