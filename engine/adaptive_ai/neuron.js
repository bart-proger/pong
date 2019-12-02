
function Neuron(inputsCount) {

    this.repetitions = []
    for (let i = 0; i < inputsCount; i++) {
        this.repetitions[this.repetitions.length] = 0;
    }
    this.output = 0;
    this.learned = false;

    console.log(inputsCount);

}
Neuron.prototype.MAX_REPETITION = 100;

Neuron.prototype.update = function(inputs) {
    var min = 0;
    var limit = false;
    for (var i = 0; i < inputs.length; i++) {
        var rep = 0;
        //if (this.repetitions[i] < this.MAX_REPETITION) {
            rep = (this.repetitions[i] += inputs[i]);
        //}
        if (this.repetitions[i] > this.MAX_REPETITION) {
            limit = true;
            //this.repetitions[i] = this.MAX_REPETITION;
        }
        if (this.repetitions[min] > rep && rep > 0) {
            min = i;
        }
    }
    for (let i = 0; i < this.repetitions.length; i++) {
        if (limit && this.repetitions[i] > 0 /*&& this.repetitions[i] < this.MAX_REPETITION*/) {
            this.repetitions[i]--;
        }
    }
    /*
if (limit && this.repetitions[min] > 0 && this.repetitions[min] < this.MAX_REPETITION) {
        this.repetitions[min]--;
    }
    */

};
Neuron.prototype.toString = function () {
    return "r=" + this.repetitions + "  out=" + this.output;
};