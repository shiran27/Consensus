function Agent(x,y) {

    this.id = agents.length;

    this.position = new Point2(x,y);
    this.initialPosition = this.position;
    this.nextPositionToBe = this.position;
    
    this.neighbors = [];

    this.graphicSizeParameter = 20;



    this.showInitial = function(){

        noStroke();

        // initial position
        fill(0,128);
        ellipse(this.initialPosition.x,this.initialPosition.y,this.graphicSizeParameter,this.graphicSizeParameter);
        
        // label of the initial position
        fill(255);
        rectMode(CENTER);
        textAlign(CENTER,CENTER);
        text((this.id+1).toString(),this.initialPosition.x,this.initialPosition.y,this.graphicSizeParameter,this.graphicSizeParameter);

    }


    this.show = function(){

        noStroke();

        // state of the agent 
        fill(0);
        ellipse(this.position.x,this.position.y,this.graphicSizeParameter/2,this.graphicSizeParameter/2);

         // label of the current position
        fill(255);
        rectMode(CENTER);
        textAlign(CENTER,CENTER);
        text((this.id+1).toString(),this.position.x,this.position.y,this.graphicSizeParameter,this.graphicSizeParameter);


    }

    this.clicked = function(){

        var mouseP = new Point2(mouseX,mouseY);
        var d = distP2(mouseP, this.position);
        if (d < this.graphicSizeParameter) {
            return true;
        }
        else{
            return false;
        }

    }

    this.clickedOnInitial = function(){
        var mouseP = new Point2(mouseX,mouseY);
        var d = distP2(mouseP, this.initialPosition);
        if (d < this.graphicSizeParameter) {
            return true;
        }
        else{
            return false;
        }
    }



    this.computeUpdate = function(){
        this.nextPositionToBe = this.position;
    }

    this.executeUpdate = function(){
        this.position = this.nextPositionToBe;
    }


}

function updateAgentNeighbors(){
    var r = communicationRange;

    for(var i = 0; i<agents.length; i++){
        agents[i].neighbors = [];
        for(var j = 0; j<agents.length; j++){
            if( j!=i && distP2(agents[i].initialPosition,agents[j].initialPosition)<=r){
                agents[i].neighbors.push(j);
            }
        }
    }
}


function addAnAgent(){

    var x = Math.round(600*Math.random()); 
    var y = Math.round(600*Math.random()); 
    agents.push(new Agent(x,y));
    consolePrint("Agent "+(agents.length)+" added at (x,y) = ("+x+","+y+").");
    
    updateAgentNeighbors();

}


function removeAnAgent(){

    agents.pop();
    consolePrint("Agent "+(agents.length)+" removed.");
    
    updateAgentNeighbors();

}    
