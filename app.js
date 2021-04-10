import express from 'express';
import db from './db';
import cors from 'cors';
import bodyParser from 'body-parser'; 
const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/api/v1/heroes',(req,res)=>{
    res.status(200).send({
        success:'true',
        message:'heroes retreived successfully',
        heroes:db
    });
});

app.get('/api/v1/heroes/:id',(req,res)=>{
    const id=parseInt(req.params.id,10);
    db.map((hero)=>{
        if(hero.id===id)
        {
            return res.status(200).send({
                success:'true',
                message:'hero retreived successfully',
                hero
            });
        }
        
    });
        return  res.status(404).send({
            success:'false',
            message:'todo does not exist'
    }); 
  });

  app.post('/api/v1/heroes',(req,res)=>{
      if(!req.body.name)
      {
          return res.status(404).send({
              success:'false',
              message:'name is required'
          });
      }

      const hero={
          id:db.length+1,
          name:req.body.name
             }
      db.push(hero);

      return res.status(200).send({
        success:'true',
        message:'hero added successfully',
        hero
      });
  });

  app.delete('/api/v1/heroes/:id',(req,res)=>{
      const id=req.params.id;
      db.map((hero,index)=>{
          if(hero.id==id)
          {
              db.splice(index,1);
              return res.status(200).send({
                success:'true',
                message:'hero deleted successfully',
               });     
          }
      });
    
       return  res.status(404).send({
        success:'false',
        message:'todo does not exist'
        }); 
    });

    app.route('/api/v1/heroes/:id').put((req,res)=>{
        let itemIndex;
        let heroFound;
        const id=+req.params.id;
        db.map((hero,index)=>{
            if(hero.id===id){
                heroFound=hero
                itemIndex=index
            }
        });
        if(!heroFound){
            return res.status(404).send({
                success:'false',
                message:'todo not found'
            });
        }
    
        const updatedHero={
            id:heroFound.id,
            name: req.body.name 
            };
    
        db.splice(itemIndex,1,updatedHero);
    
        return res.status(201).send({
            success:'true',
            message:'todo updated successfully',
            updatedHero
        });
    })
    
    const PORT=5000
    app.listen(PORT,()=>{
        console.log(`Server running at ${PORT}`);
    });