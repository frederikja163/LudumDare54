type EquationDelegate = (values: number[], inputs: Equation[], updatedIndex: number) => number;

export class EquationEvent extends Event{
    private readonly _newValue: number;
    public get newValue(): number {
        return this._newValue;
    }

    constructor(type: string, newvalue: number){
        super(type);
        this._newValue = newvalue;
    }
}

export enum EquationEventType{
    ValueChange = "valuechange",
}

export class Equation extends EventTarget{
    protected _value: number;
    private readonly subEquations: Equation[];
    protected equation: EquationDelegate;

    constructor(subEquations: Equation[], equation: (values: number[], inputs: Equation[], updatedIndex: number) => number){
        super();
        this.equation = equation;
        this.subEquations = subEquations;
        for (let i = 0; i < subEquations.length; i++){
            subEquations[i].addEventListener(EquationEventType.ValueChange, () => this.update(i));
        }
        this.update(-1);
    }

    protected update(index: number){
        this._value = this.equation(this.subEquations.map(e => e._value), this.subEquations, index);
        this.dispatchEvent(new EquationEvent(EquationEventType.ValueChange, this._value));
    }

    public override addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void {
        super.addEventListener(type, callback, options);
        if (callback){
            if (typeof callback == "function"){
                (callback as EventListener)(new EquationEvent(EquationEventType.ValueChange, this._value));
            }
            else if (typeof callback == "object"){
                (callback as EventListenerObject).handleEvent(new EquationEvent(EquationEventType.ValueChange, this._value));
            }
        }
    }

    public get value(): number {
        return this._value;
    }
}

export class Value extends Equation{
    constructor(startValue: number){
        super([], () => startValue);
        this._value = startValue;
        this.equation = () => this._value;
        this.update(-1);
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number){
        this._value = value;
        this.update(-1);
    }
}

export class GameData{
    public readonly queensTotal = value(1);
    public readonly farmersTotal = value(0);
    public readonly workersTotal = value(0);
    public readonly soldiersTotal = value(0);

    public readonly queensActive = this.queensTotal;
    public readonly farmersActive = value(0);
    public readonly workersActive = value(0);
    public readonly soldiersActive = value(0);

    public readonly queensIdle = equation([this.queensTotal, this.queensActive], n => n[0] - n[1]);
    public readonly farmersIdle = equation([this.farmersTotal, this.farmersActive], n => n[0] - n[1]);;
    public readonly workersIdle = equation([this.workersTotal, this.workersActive], n => n[0] - n[1]);;
    public readonly soldiersIdle = equation([this.soldiersTotal, this.soldiersActive], n => n[0] - n[1]);;

    public readonly queenTiles = value(0);
    public readonly residentialTiles = value(0);
    public readonly farmerTiles = value(0);
    public readonly trainingTiles = value(0);

    public readonly antsIdle = sum([this.queensIdle, this.farmersIdle, this.workersIdle, this.soldiersIdle]);
    public readonly antsActive = sum([this.queensActive, this.farmersActive, this.workersActive, this.soldiersActive]);
    public readonly antsTotal = sum([this.antsIdle, this.antsActive]);
    public readonly totalTiles = sum([this.queenTiles,this.farmerTiles,this.residentialTiles,this.trainingTiles]);

    public readonly foodConsumption = weightedSum([this.queensActive, this.farmersActive, this.workersActive, this.soldiersActive, this.antsIdle],
        [10, 1, 3, 2, 1]);
    public readonly foodProduction = equation([this.farmersActive, this.farmerTiles], n => Math.min(30 * n[0], 45 * n[1]));
    public readonly antProduction = this.queenTiles;
    public readonly antCapacity = product([this.residentialTiles, value(5)]);
    public readonly combatPower = product([this.trainingTiles, this.soldiersActive]);
    public readonly tileCapacity = product([value(10), sum([this.workersActive, this.workersIdle])]);
}

export function value(value: number){
    return new Value(value);
}

export function equation(subEquations: Equation[], equation: (values: number[], inputs: Equation[], updatedIndex: number) => number){
    return new Equation(subEquations, equation);
}

export function sum(equations: Equation[]){
    return new Equation(equations, (values) => {
        let sum = 0;
        for (const value of values) {
            sum += value;
        }
        return sum;
    });
}

function weightedSum(equations: Equation[], weights: number[]){
    return new Equation(equations, (values) => {
        let sum = 0;
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            const weight = weights[i];
            
            sum += weight * value;
        }
        return sum;
    });
}

function product(equations: Equation[]){
    return new Equation(equations, (values) => {
        let product = 1;
        for (const value of values) {
            product *= value;
        }
        return product;
    });
}