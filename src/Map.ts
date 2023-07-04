import { Producer } from './Producer'

type Map = <A, B>(f: (a: A) => B) => <C>(s: Producer<C, A>) => Producer<C, B>

export const map: Map = f => source => (complete, next) =>
	source(complete, a => next(f(a)))
