// this is the meat of tan() but without the coefficient
function protoTan(angle) {    
        var loopCount = 100000;
        var protoTan = angle; 
        var num;                                                 
        var denom;
        for (var i=Math.PI; i<Math.PI*loopCount; i+=Math.PI) {   
            num = (angle+i)*(angle-i);                              
            denom = (angle+i-(Math.PI/2))*(angle-i+(Math.PI/2));    
            protoTan = protoTan*num/denom;                          
        }                                                           
        return protoTan;
}

// finds the coefficient by plugging in 45 degrees, and returns the real tan
function tan(angle) {                        
        var coef = 1/protoTan(Math.PI/4);
        return coef * protoTan(angle);  
}                            

function sin(angle) {
        var hypotenuse = Math.sqrt(tan(angle)*tan(angle) + 1);
	if(angle % (Math.PI*2) < Math.PI) { 
        		return Math.abs(tan(angle) / hypotenuse);
	} else {
		return -1*Math.abs(tan(angle) / hypotenuse);
	}
}

function cos(angle) {
        var hypotenuse = Math.sqrt(tan(angle)*tan(angle) + 1);
	if(angle % (Math.PI*2) < Math.PI*1.5 && angle % (Math.PI*2) > Math.PI*.5) { 
        		return -1 / hypotenuse;
	} else {
		return 1 / hypotenuse;
	}
}