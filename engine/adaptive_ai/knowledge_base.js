

function KnowledgeBase() {

    this.images = [];
    this.actions = [];
    this.nextImages = [];
    this.knowledges = [];

    this.newNeuron = null;

}

KnowledgeBase.prototype.update = function(image, action, nextImage) {
    this.newNeuron = null;
    var img = this.images.find(i => i.name === image.name);
    if (img === undefined) {
        this.images.push(img = new Neuron(null, image.name));
        img.isRecogned = true;
    }
    img.output = image.output;
    var act = this.actions.find(i => i.name === action.name);
    if (act === undefined) {
        this.actions.push(act = new Neuron(null, action.name));
        act.isRecogned = true;
    }
    act.output = action.output;
    var nimg = this.nextImages.find(i => i.name === nextImage.name);
    if (nimg === undefined) {
        this.nextImages.push(nimg = new Neuron(null, nextImage.name));
        nimg.isRecogned = true;
    }
    nimg.output = nextImage.output;

    var knw = this.knowledges.find(k => k.parents.includes(img) 
                                           && k.parents.includes(act) 
                                           && k.parents.includes(nimg));
    if (knw === undefined) {
        this.knowledges.push(this.newNeuron = knw = new Neuron([img, act, nimg], act.name));
    }
    knw.update();
    img.output = act.output = 0;
};
KnowledgeBase.prototype.getNextActions = function(image) {
    //this.nextImages.forEach(ni => ni.output = 1);
    var img = this.images.find(i => i.name === image.name);
    if (img) {
        img.output = 1;
        var result = []; 
        this.knowledges.forEach(k => {
            if (k.update() === 1/* && !result.includes(k)*/) result.push(k);
        });
        img.output = 0;
        return result;
    }
    return [];
};
KnowledgeBase.prototype.onShowDbgInfo = function(offx, offy, maxw, maxh) {
    var stepx = DBG.radius*15,
        stepy = DBG.radius*11,
        lastOrder = 0,
        active = 0;
    /*if (DBG.compact) {
        stepx = DBG.radius*3;
        stepy = DBG.radius*2;
    }*/
    var x = offx, 
        y = offy;
    this.knowledges.forEach(k => {
        if (y-offy >= maxh) {
            y = offy;
            x += stepx;
        }
//neurons
        Graphics.color(k === this.newNeuron ? "violet" : 
                       //k.output === 1 || k.isActive ? "yellow" : 
                       k.isRecogned ? "blue" : 
                       "black");
        if (k.isLearned) 
            Graphics.fillCircle(x, y, DBG.radius);
        else
            Graphics.drawCircle(x, y, DBG.radius);
        k.parents.forEach((p, pi) => {
            var yy = y + pi*DBG.radius*3;
//text
            Graphics.font("10px Arial");
            Graphics.drawText(p.name//k.inputs.reduce((s, v) => { return s + v; }, "")
                            //+ " = " + k.output
                            + (!k.isLearned ? " {" + k.learningsCount + "}" : ""), x + DBG.radius, yy - DBG.radius);
        });

        y += stepy;
    });
};