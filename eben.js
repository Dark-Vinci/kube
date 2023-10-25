class Envelope{
    constructor(value) {
        this.value = value;
    }
}

class SecretCracker {
    constructor(coefficient = 36.78, min = 0, max = 100, count = 100) {
        this.coefficient = coefficient;
        this.count = count;
        this.min = min;
        this.max = max;

        this.generateEnvelopes();

        // shuffle the envolopes to get a well distributed values
        this.fisherYatesShuffle();
    }

    generateEnvelopes() {
        let envelopes = [];

        // generate random value between the max and min values as the envelopes values;
        for (let i = 0; i < this.count; i++) {
            const radomValue = Math.floor(Math.random() * (this.max - this.min)) + this.min;
            const envelope = new Envelope(radomValue);

            envelopes.push(envelope);
        }

        this.envelopes = envelopes;
    }

    solve() {
        let coefficientMaxValue = 0;
        let indexThreshold = this.calculateIndexFromCoefficient();

        // loop through the envelopes to the index of the [a little over 36.78(coefficient)] and get the max;
        for (let i = 0; i < this.envelopes.length; i++) {
            // when the index is greater than threshold index, break from the loop
            if (i > indexThreshold) {
                break;
            }

            // get the evelope's value, if it is more than the max, save the evelopes value as the max
            const envelopeAmount = this.envelopes[i].value;
            if (envelopeAmount > coefficientMaxValue) {
                coefficientMaxValue = envelopeAmount
            }
        }

        // let save = coefficientMaxValue;

        let newMax = 0;

        // loop through the remaining part of the un-opened evelopes and get the first max value that is more than the initially saved value.
        for (let j = indexThreshold + 1; j < this.envelopes.length; j++) {
            const envelopeAmount = this.envelopes[j].value;
            if (envelopeAmount > coefficientMaxValue) {
                newMax = envelopeAmount
                break
            }
        }

        // if there no amount in the second batch of envelope that is more than the initial maximum, get the last evelopes value and set it as max
        if (newMax == 0) {
            newMax = this.envelopes[this.envelopes.length - 1].value;
        }

        return newMax;
    }

    // method to shuffle array of envelope using fisher yates method
    fisherYatesShuffle() {
        for (let i = this.envelopes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
          [this.envelopes[i], this.envelopes[j]] = [this.envelopes[j], this.envelopes[i]]; // Swap elements
        }
    }

    // get the index of the [a little over 36.78] percent 
    calculateIndexFromCoefficient() {
        const envelopeCount = this.envelopes.length;

        return Math.ceil((this.coefficient / 100) * envelopeCount);
    }
}

function generateAverageResult(count) {
    let sum = 0;

    for (let i = 0; i < count; i++) {
        sum += new SecretCracker(36.78).solve();
    }
    
    return sum /count;
}

// deduction -> the average generated value is approximately equal 73

console.log({ abc: generateAverageResult(1000)})