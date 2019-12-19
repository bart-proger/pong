
function Neuron(parents, name) {

    this.name = name;
    this.parents = parents ? parents : [];
    this.order = !parents ? 0 : 1 + parents.reduce((max, cur) => {
        return (cur.order > max) ? cur.order : max;
    }, 0);
    this.learningsCount = 0;
    this.recognitionsCount = 0;
    this.inputs = [];
    this.output = 0;
    this.stop = 0;
    this.isLearned = false;
    this.isRecogned = false;
    this.isActive = false;

    this.noise = 0;

}
Neuron.prototype.MAX_LEARNINGS = 5; /*1-44, 45-...*/
Neuron.prototype.MAX_NOISE = 0.49;

Neuron.prototype.update = function() {
    if (this.parents.length) {       
        this.inputs = this.parents.map((p) => { return p.output; });

        this.noise = (1 - this.inputs.reduce((sum, e) => { return sum + e; }, 0) / this.inputs.length);
        var max = this.MAX_LEARNINGS;// * this.order;
        this.isActive = false;
        
        if (this.noise <= this.MAX_NOISE * (this.recognitionsCount / (max+1))){
            if (!this.isLearned && ++this.learningsCount >= max)
                this.isLearned = true;
            if (this.isLearned) {
                if (this.recognitionsCount < (max+1))
                    ++this.recognitionsCount;
                else {
                    this.isRecogned = true;
                    this.parents.forEach(p => { p.stop = 1; });
                } 
                this.output = 1;
            }
            this.isActive = true;
        }
        else
            this.output = 0;
    }

    if (this.stop === 1) {
        this.output = 0;
        this.stop = 0;
    }
    return this.output;
};
