
function Neuron(parents) {

    this.parents = parents;
    this.childs = [];
    this.order = !parents ? 0 : 1 + parents.reduce((max, cur) => {
        return (cur.order > max) ? cur.order : max;
    }, 0);
    this.repetition = 0;
    this.inputs = [];
    this.output = 0;
    this.learned = false;
    this.isParent = false;

}
Neuron.prototype.MAX_REPETITION = 100;
Neuron.prototype.MAX_ERROR = 0.15;
Neuron.prototype.update = function() {
    if (this.parents && this.parents[0] instanceof Neuron) {
        this.output = 0;
        this.inputs = this.parents.map((e) => { return e.output; });
    
        var error = (1 - this.inputs.reduce((sum, e) => { return sum + e; }, 0) / this.inputs.length);
        if (!this.learned && error <= this.MAX_ERROR/* === 0*/) {
            if (++this.repetition >= this.MAX_REPETITION) 
                this.learned = true;
        }
        if (this.learned && error <= this.MAX_ERROR/* === 0*/) {
            this.output = 1;
        }
    }
    //console.log(this + "");
};
Neuron.prototype.toString = function () {
    return this.order + 
           ") in=" + this.inputs.reduce((s, v) => { return "" + s + v; }, "") + 
           " out=" + this.output;
};
