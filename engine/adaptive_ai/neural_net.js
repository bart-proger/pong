

function NeuralNet() {

    this.neurons = [];
    this.receptors = [];

}

NeuralNet.prototype.inputSignals = function(signals) {
    if (this.neurons.length === 0) {
        for (var i = 0; i < signals.length; i++) {
            this.neurons.push(new Neuron());
        }
        this.receptors = this.neurons.slice();
    }
    signals.reverse().forEach((v, i) => { this.receptors[i].output = v; });
};
NeuralNet.prototype.update = function() {
    //console.log("frame");
    var activeNeurons = [];
    var order = 0;
    this.neurons.forEach((n, i) => {
        if (i < this.neurons.length - this.receptors.length)
            n.update();
        if (n.output === 1) {
            var isParent = function(neuron) {
                return activeNeurons.some(an => { 
                    return an.parents && an.parents.includes(neuron)
                        || neuron.parents && neuron.parents.some(np => { return isParent(np); });
                })
            };
            if (!isParent(n)) {
            //if (!activeNeurons.some(an => { return an.parents && an.parents.includes(n); })) {
                if (n.order > order) order = n.order;
                activeNeurons.push(n);
            }
        }
    });
    if (activeNeurons.length > 1) {
        var newNeuron = new Neuron(activeNeurons);
        if (!this.neurons.some((n) => { 
            return n.parents && n.parents.length === activeNeurons.length
                && n.parents.intersect(activeNeurons).length === activeNeurons.length; 
        })) {
            this.neurons.unshift(newNeuron);
            this.neurons.sort((a, b) => { return b.order - a.order; });
        }
    }
};
NeuralNet.prototype.onShowDbgInfo = function(offx, offy) {
    var calcPos = false;
    var RADIUS = 6;
    var parentPos = [];
    var stepx = 40,
        stepy = 30,
        lastOrder = 0;
    var x = offx, 
        y = offy;
    var reverse = this.neurons.slice().reverse();
    reverse.forEach((n, i) => {
        if (calcPos) {
            var py = 0;
            if (n.parents) {
                py = (n.parents.reduce((s, v) => { return s + parentPos[reverse.indexOf(v)].y-offy; }, 0) / n.parents.length);
                y = offy + py;
            }
        }
        if (n.order !== lastOrder) {
            x = offx + n.order * stepx;
            //if (!calcPos)
                y = offy;
            Graphics.drawText(n.order, x, offy-40);
        }
        //console.log("x=" + x + " y=" + y);
        parentPos.push({x: x, y: y});

        Graphics.color(n.output === 1 ? "red" : "black");
        if (n.parents)
            n.parents.forEach((v) => {
                var i = reverse.indexOf(v);
                //Graphics.drawLine(x, y, parentPos[i].x + RADIUS, parentPos[i].y);
                Graphics.drawCurve(parentPos[i].x + RADIUS, parentPos[i].y, 
                                   parentPos[i].x + RADIUS + 20, parentPos[i].y, 
                                   x - 15, y,
                                   x, y);
            });

        Graphics.color("green");
        Graphics.fillCircle(x, y, RADIUS);
        Graphics.color(n.output === 1 ? "orangered" : "black");
        if (n.isLearned) 
            Graphics.fillCircle(x, y, RADIUS);
        else
            Graphics.drawCircle(x, y, RADIUS);
        Graphics.font("10px Arial");
        Graphics.drawText((n.inputs ? n.inputs.reduce((s, v) => { return s + v; }, "") : "") 
                        //+ " = " + n.output
                        + (!n.isLearned ? " {" + n.learningsCount + "}" : ""), x, y - RADIUS);
        
        if (!calcPos || !n.parents)
            y += stepy;
        lastOrder = n.order;
    });
    //console.log(reverse.reduce((s, v) => { return s + " " + v.order }, ""));
};