
var DBG = {
    showLinks: true, 
    radius: 5,
    compact: false
};


function NeuralNet() {

    this.neurons = [];
    this.receptors = [];
    this.newNeuron = null;

}

NeuralNet.prototype.inputSignals = function(signals) {
    if (this.neurons.length === 0) {
        for (var i = 0; i < signals.length; i++) {
            this.neurons.push(new Neuron(null, this.neurons.length));
        }
        this.receptors = this.neurons.slice();
    }
    signals.reverse().forEach((v, i) => { this.receptors[i].output = v; });
};
NeuralNet.prototype.update = function() {
    //console.log("frame");
    var activeNeurons = [], 
        activeParents = [];
    //var order = 0;



    this.neurons.forEach((n, i) => {
        //if (i < this.neurons.length - this.receptors.length)
            n.update();
        if (n.output === 1/*n.isRecogned*/) {
            /*var isParent = function(neuron) {
                return activeNeurons.some(an => { 
                    return an.parents && an.parents.includes(neuron)
                        || neuron.parents && neuron.parents.some(np => { return isParent(np); });
                })
            };
            if (!isParent(n)) {*/

            //if (activeNeurons.length < 5) {
                //if (activeNeurons.some(an => an.parents.includes(n)) 
                //|| activeParents.some(ap => ap.parents.includes(n))) {
                //    activeParents.push(n);
                //}
                //else {
                //    //if (n.order > order) order = n.order;
                //if (!activeNeurons[0] || activeNeurons[0].order-n.order < 3) 
                    activeNeurons.push(n);
                //}
            //}
        }
    });

    if (this.newNeuron) {
        this.neurons.unshift(this.newNeuron);
        this.neurons.sort((a, b) => { return b.order - a.order; });
        this.newNeuron = null;
    }

    if (activeNeurons.length > 1) {
        if (!this.neurons.some((n) => { 
            return n.parents.length === activeNeurons.length
                && n.parents.intersect(activeNeurons).length === activeNeurons.length; 
        })) {
            this.newNeuron = new Neuron(activeNeurons, this.neurons.length);
            //this.neurons.unshift(this.newNeuron);
            //this.neurons.sort((a, b) => { return b.order - a.order; });
        }
    }
};
NeuralNet.prototype.onShowDbgInfo = function(offx, offy) {
    var parentPos = [];
    var stepx = DBG.radius*8,
        stepy = DBG.radius*6,
        lastOrder = 0,
        active = 0;
    if (DBG.compact) {
        stepx = DBG.radius * 3;
        stepy = DBG.radius*2 + 1;
    }
    var x = offx, 
        y = offy;
    var reversed = this.neurons.slice().reverse();

    reversed.forEach((n, i) => {
        active += n.output === 1 ? 1 : 0;
        if (n.order !== lastOrder) {
            x = offx + n.order * stepx;
            y = offy + (n.order % 2) * stepy/2;
            Graphics.drawText(n.order, x, offy-40);
        }
        parentPos.push({x: x, y: y});
//-- links
        if (!DBG.compact && DBG.showLinks) {
            Graphics.color(n.output === 1 ? "red" : "black");
            n.parents.forEach((p, pi) => {
                var i = reversed.indexOf(p);
                //Graphics.drawLine(x, y, parentPos[i].x + DBG.radius, parentPos[i].y);
                var yy = 2*DBG.radius / (n.parents.length+1);
                Graphics.drawCurve(parentPos[i].x + DBG.radius, parentPos[i].y, 
                                parentPos[i].x + DBG.radius + 20, parentPos[i].y, 
                                x - 15, y,
                                x, y - (DBG.radius - yy/2) + pi * yy);
            });
        }

        Graphics.color("green");
        Graphics.fillCircle(x, y, DBG.radius);
        Graphics.color(n.output === 1 ? "orangered" : (n.isRecogned ? "yellow" : "black"));
        if (n.isLearned) 
            Graphics.fillCircle(x, y, DBG.radius);
        else
            Graphics.drawCircle(x, y, DBG.radius);
/*
        if (n.isRecogned) {
            Graphics.color("orangered");
            Graphics.drawCircle(x, y, DBG.radius);
        }
*/        if (!DBG.compact){
            Graphics.font("10px Arial");
            Graphics.drawText((n.inputs ? n.inputs.reduce((s, v) => { return s + v; }, "") : "") 
                            //+ " = " + n.output
                            + (!n.isLearned ? " {" + n.learningsCount + "}" : ""), x, y - DBG.radius);
        }
        y += stepy;
        lastOrder = n.order;
    });
    Graphics.font("14px Arial");
    Graphics.color("blue");
    Graphics.drawText(reversed.length + " / " 
                    + reversed.reduce((s,v) => { return s + (v.isLearned ? 1 : 0); }, 0)
                    + " @ " + active, 
                    offx, offy-20);
    if (active > 1) {
        active = active;
    }
    if (this.newNeuron) {
        this.newNeuron = this.newNeuron;
    }
};