

function NeuralNet(inputsCount) {

    this.neurons = [];
    for (var i = 0; i < inputsCount; i++) {
        this.neurons.push(new Neuron(null));
    }
    this.senseNeurons = this.neurons.slice();
}

NeuralNet.prototype.setInputs = function(inputs) {
    inputs.reverse().forEach((v, i) => { this.senseNeurons[i].output = v; });
};
NeuralNet.prototype.update = function() {
    var activeNeurons = [];
    var order = 0, 
        allParent = true, 
        related = false;
    this.neurons.forEach((n, i) => {
        n.update();
        if (n.output === 1) {
            if (n.order > order) {
                order = n.order;
            }
            related = related || activeNeurons.some((an) => {
                return an.parents && an.parents.includes(n);
            });
            activeNeurons.push(n);
        }
    });
    if (!related && /*!allParent &&*/ activeNeurons.length > 1) {
        var newNeuron = new Neuron(activeNeurons);
        if (!this.neurons.some((v) => { return v.parents && v.parents.intersect(activeNeurons).length === activeNeurons.length; })) {
            this.neurons.unshift(newNeuron);
            activeNeurons.forEach((an) => { an.childs.push(newNeuron); });
            this.neurons.sort((a, b) => { return b.order - a.order; });
            activeNeurons.forEach((n) => { n.isParent = true; });
        }
    }
};
NeuralNet.prototype.onShowDbgInfo = function() {
    var parentPos = [];
    var offx = 100, offy = 100, lastOrder = 0;
    var x = offx, y = offy;
    var reverse = this.neurons.slice().reverse();
    reverse.forEach((n, i) => {
        /*var py = 0;
        if (n.parents) {
            py = (n.parents.reduce((s, v) => { return s + parentPos[reverse.indexOf(v)].y-offy; }, 0) / n.parents.length);
            y = offy + py;
        }*/
        if (n.order !== lastOrder) {
            x = offx + n.order * 70;
            y = offy;
            Graphics.drawText(n.order, x, offy-40);
        }
        //console.log("x=" + x + " y=" + y);
        parentPos.push({x: x, y: y});

        Graphics.color(n.output === 1 ? "red" : "black");
        if (n.learned) 
            Graphics.fillCircle(x, y, 10);
        else
            Graphics.drawCircle(x, y, 10);

        if (n.parents)
            n.parents.forEach((v) => {
                var i = reverse.indexOf(v);
                Graphics.drawLine(x, y, parentPos[i].x+10, parentPos[i].y);
            });

        Graphics.drawText((n.inputs ? n.inputs.reduce((s, v) => { return s + v; }, "") : "") + 
        " = " + n.output, x, y-10);
        
        //if (!n.parents)
            y += 50;
        lastOrder = n.order;
    });
    //console.log(reverse.reduce((s, v) => { return s + " " + v.order }, ""));
};