const{Router} = require('express');
const router = Router();


router.get('/',(req,res) =>{
    res.send('adentro perro')
});



module.exports=router;