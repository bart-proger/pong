
var DBG = {
    showLinks: true, 
    radius: 4,
    compact: false
};


function NeuralNet(prefix) {

    this.prefix = prefix;
    this.layers = [];  // [order][neuron]
    this.layers.push([]);
    this.receptors = this.layers[0];
    this.newNeuron = null;

}

NeuralNet.prototype.inputSignals = function(signals) {
    this.receptors.forEach(r => r.output = 0);
    signals.forEach(s => {
        var found = this.receptors.find(r => s.name === r.name);
        if (found === undefined) {
            this.receptors.push(found = new Neuron(null, s.name));
            found.isRecogned = true;
        }
        found.output = s.output;
    });
};
NeuralNet.prototype.outputSignals = function() {
    var signals = [];
    this.layers.forEach((neurons) => {
        signals.concat(neurons.filter(n => n.output === 1));
    });
    return signals;
};
NeuralNet.prototype.neuronsCount = function() {
    return this.layers.reduce((count, neurons) => count + neurons.length, 0);
};
NeuralNet.prototype.update = function(orderDepht) {
    var activeNeurons = [],
        newParents = [];
    
    this.newNeuron = null;

    this.layers.forReverse((neurons) => {
        neurons.forEach((n) => {
            if (n.update() === 1 && n.noise === 0) {
                newParents.push(n);
                activeNeurons.push(n);
            }
        }); 
    });
    if (newParents.length > 1) {
        if (!this.layers.some(neurons => { 
            return neurons.some((n) => { 
                return (n.parents.length > 0 //newParents.length === n.parents.length
                     && n.parents.intersect(newParents).length === n.parents.length); 
        }); })) {
            this.newNeuron = new Neuron(newParents, this.prefix + (this.neuronsCount()-this.receptors.length));
            if (!this.layers[this.newNeuron.order])
            this.layers[this.newNeuron.order] = [];
            this.layers[this.newNeuron.order].push(this.newNeuron);
        }
        console.log((this.newNeuron ? "NEW =" : "") + newParents.reduce((s,p)=>s+"  "+p.name, ""));
    }
    
    return activeNeurons.map(an => { return {name: an.name, output: an.output}; });
};
NeuralNet.prototype.onShowDbgInfo = function(offx, offy, maxw, maxh) {
    var parentPos = [];
    var stepx = DBG.radius*8,
        stepy = DBG.radius*5,
        lastOrder = 0,
        active = 0;
    if (DBG.compact) {
        stepx = DBG.radius * 3;
        stepy = DBG.radius*2;
    }
    var x = offx, 
        y = offy;

    var actives = [];
    
    stepx = /*Math.max(stepx,*/ maxw / (this.layers.length+1)/*)*/;
    this.layers.forEach((neurons, order) => {
        if (!parentPos[order]) parentPos[order] = [];
        if (!DBG.compact) {
            stepy = maxh / (neurons.length+1)
        }
        x = offx + order*stepx;
//order
        Graphics.color("black");
        if (order > 0) 
            Graphics.drawText(order, x, offy-40);

        neurons.forEach((n, i) => {
            if (n.output === 1) 
                actives.push(n);
            if (DBG.compact)
                y = offy + (order % 2) * stepy/2 + i*stepy;
            else
                y = offy + stepy*(i+1) + ((order % 2) ? stepy/4 : -stepy/4);
            parentPos[order].push({x: x, y: y});
//parents
            if (!DBG.compact && DBG.showLinks) {
                if (n === this.newNeuron)
                    Graphics.color("violet");
                n.parents.forEach((p, pi) => {
                    Graphics.color(n.output === 1 ? "yellow" : "black");
                    var pp = this.layers.index2DOf(p);
                    var yy = 2*DBG.radius / (n.parents.length+1);
                    Graphics.drawCurve(parentPos[pp.i][pp.j].x + DBG.radius, parentPos[pp.i][pp.j].y, 
                                    parentPos[pp.i][pp.j].x + DBG.radius + DBG.radius*3.5, parentPos[pp.i][pp.j].y, 
                                    x - DBG.radius*2.5, y,
                                    x, y - (DBG.radius - yy/2) + pi * yy);
                    if (n.output === 1) {
                        Graphics.color("yellow");
                        Graphics.drawCircle(parentPos[pp.i][pp.j].x, parentPos[pp.i][pp.j].y, DBG.radius);
                    }
                });
            }
//neurons
            Graphics.color("green");
            Graphics.fillCircle(x, y, DBG.radius);
            Graphics.color(n === this.newNeuron ? "violet" : 
                           n.output === 1 ? "yellow" :
                           n.output === 1 && n.noise > 0 ? "gold" :
                           n.isRecogned ? "blue" : 
                           n.isActive && !n.isLearned ? "aqua" :
                           "black");
            //if (n === this.newNeuron)
            //    Graphics.color("violet");
            if (n.isLearned || (n.isActive && !n.isLearned)) 
                Graphics.fillCircle(x, y, n.output === 1 ? DBG.radius*1.2 : DBG.radius);
            else
                Graphics.drawCircle(x, y, DBG.radius);
//text
            if (!DBG.compact) {
                Graphics.font("10px Arial");
                Graphics.drawText(n.name//n.inputs.reduce((s, v) => { return s + v; }, "")
                                //+ " = " + n.output
                                + (!n.isLearned && order > 0 ? " {" + n.learningsCount + "}" : ""), x, y - DBG.radius);
            }
        });
    });
// child
    var child = null;
    this.layers.some((neurons, order) => {
        return neurons.some((n, i) => { 
            if (n.parents.length === actives.length && n.parents.intersect(actives).length === n.parents.length){
                child = {i: order, j: i};
                return true;
            }
            return false;
        });
    });
    if (child) {
        Graphics.color("aqua");
        Graphics.drawCircle(parentPos[child.i][child.j].x, parentPos[child.i][child.j].y, DBG.radius);
    }
//info
    Graphics.font("14px Arial");
    Graphics.color("blue");
    Graphics.drawText(this.neuronsCount()-this.receptors.length + " / " 
                    +  this.layers.reduce((count, neurons) => count + neurons.reduce((s,v) => { return s + (v.isLearned ? 1 : 0); }, 0), 0)
                    + " @ " + actives.length, 
                    offx, offy-20);
    if (actives.length > 1) {
        active = active;
        if (!this.newNeuron) {




            this.newNeuron = this.newNeuron;
        }
    }
    if (actives.length > 3) {
        active = active;
    }
    if (this.newNeuron) {
        this.newNeuron = this.newNeuron;
    }
};

    