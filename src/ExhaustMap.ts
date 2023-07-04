import { Producer } from './Producer'

type ExhaustMapW = <C1, A, B>(
	f: (a: A) => Producer<C1, B>
) => <C2>(s: Producer<C2, A>) => Producer<C1, B>

type ExhaustMap = <C, A, B>(
	f: (a: A) => Producer<C, B>
) => (s: Producer<C, A>) => Producer<C, B>

/** @todo */
export declare const exhaustMap: ExhaustMap
export declare const exhaustMapW: ExhaustMapW
