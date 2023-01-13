Algebra(3,1,()=>{ 
  var ni = 1e4+1e3,           // n-infinite
      no = .5e4-.5e3;         // n-origin
  var point  = (x,y)=>no + x*1e1 + y*1e2 + 0.5*(x*x+y*y)*ni;
  var translate = (v)=> (1-.5*!(v^ni));

  var nbPoints = 4;
  var speed = 0.002/nbPoints;
  var t = () => (performance.now()*speed) % 1.0;
  
  var points = [...Array(nbPoints)].map((x,i)=>
  point((i/(nbPoints-1))*4-2 ,Math.random()*4-2)
  );
  
  var pointsNames = [...Array(nbPoints*2)].map((x,i)=>
  {
    if(i%2==0)
    {
      return points[i/2];
    }else
    {
      return ( Math.floor(i/2)).toString();
    }
  });

  var showPoints = true;
  var showLines = true;

  document.body.appendChild(this.graph(()=>
    {
    var newPoints = [...Array(nbPoints-1)];
    newPoints[0] = points;
    var lines = [...Array(nbPoints-1)];
    for(var j = 0;j<nbPoints-1;j++)
    {
      lines[j] =  [...Array(newPoints[j].length-1)].map((x,i)=> newPoints[j][i] ^ newPoints[j][i+1] ^ ni);
      newPoints[j+1] =  [...Array(lines[j].length)].map((x,i)=>
      {
        return translate(t * !-lines[j][i]) >>>newPoints[j][i];
      });
    }
    var result = [];
    result.push(0x73d216);
    if(showPoints)
    {
      result.push(...newPoints.flat());
    }else{
      result.push(...newPoints[nbPoints-1]);
    }
    if(showLines)
    {
      result.push(0xcc0000);
      result.push(...lines.flat());
    }
    
    result.push(0x3465a4);
    result.push(...pointsNames);
    
    return result;}
    ,{conformal:true,grid:false,animate:true}));                 // conformal flag!  

});
