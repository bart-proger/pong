
function Neuron(parents) {

    this.parents = parents;
    //this.childs = [];
    this.order = !parents ? 0 : 1 + parents.reduce((max, cur) => {
        return (cur.order > max) ? cur.order : max;
    }, 0);
    this.learningsCount = 0;
    this.recognitionsCount = 0;
    this.inputs = [];
    this.output = 0;
    this.isLearned = /*!parents ? true :*/ false;

}
Neuron.prototype.MAX_LEARNINGS = 3; /*1-44, 45-...*/
Neuron.prototype.MAX_NOISE = 0.34;

Neuron.prototype.update = function() {
    if (!this.parents)
        return;
    this.inputs = this.parents.map((p) => { return p.output; });
    this.output = 0;
    var noise = (1 - this.inputs.reduce((sum, e) => { return sum + e; }, 0) / this.inputs.length);

    if (noise <= this.MAX_NOISE /*/ this.order*/ * (this.recognitionsCount / (this.order*2)/*this.MAX_LEARNINGS*/)){
        if (!this.isLearned && ++this.learningsCount >= (this.order*2)/*this.MAX_LEARNINGS*/)
            this.isLearned = true;
        if (this.isLearned) {
            if (this.recognitionsCount < (this.order*2)/*this.MAX_LEARNINGS*/)
                ++this.recognitionsCount;
            this.output = 1;
        }
    }
};
