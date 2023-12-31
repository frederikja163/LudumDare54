export class Equation extends EventTarget {
    protected _value: number;
    private readonly subEquations: Equation[];
    protected equation: EquationDelegate;

    constructor(subEquations: Equation[], equation: (values: number[], inputs: Equation[], updatedIndex: number) => number) {
        super();
        this.equation = equation;
        this.subEquations = subEquations;
        for (let i = 0; i < subEquations.length; i++) {
            subEquations[i].addEventListener(EquationEventType.ValueChange, () => this.update(i));
        }
        this.update(-1);
    }

    protected update(index: number) {
        this._value = this.equation(this.subEquations.map(e => e._value), this.subEquations, index);
        this.dispatchEvent(new EquationEvent(EquationEventType.ValueChange, this._value));
    }

    public override addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void {
        super.addEventListener(type, callback, options);
        if (callback && type === EquationEventType.ValueChange) {
            if (typeof callback == "function") {
                (callback as EventListener)(new EquationEvent(EquationEventType.ValueChange, this._value));
            }
            else if (typeof callback == "object") {
                (callback as EventListenerObject).handleEvent(new EquationEvent(EquationEventType.ValueChange, this._value));
            }
        }
    }

    public get value(): number {
        return this._value;
    }
}
export class EquationEvent extends Event {
    private readonly _newValue: number;
    public get newValue(): number {
        return this._newValue;
    }

    constructor(type: string, newvalue: number) {
        super(type);
        this._newValue = newvalue;
    }
}

export enum EquationEventType {
    ValueChange = "valuechange"
}
export type EquationDelegate = (values: number[], inputs: Equation[], updatedIndex: number) => number;
export class Value extends Equation {
    constructor(startValue: number) {
        super([], () => startValue);
        this._value = startValue;
        this.equation = () => this._value;
        this.update(-1);
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
        this.update(-1);
    }
}

export function value(value: number) {
    return new Value(value);
}
export function equation(subEquations: Equation[], equation: (values: number[], inputs: Equation[], updatedIndex: number) => number) {
    return new Equation(subEquations, equation);
}
export function sum(equations: Equation[]) {
    return new Equation(equations, (values) => {
        let sum = 0;
        for (const value of values) {
            sum += value;
        }
        return sum;
    });
}
export function weightedSum(equations: Equation[], weights: number[]) {
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
export function product(equations: Equation[]) {
    return new Equation(equations, (values) => {
        let product = 1;
        for (const value of values) {
            product *= value;
        }
        return product;
    });
}

