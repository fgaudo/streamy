import { Producer } from './Producer'

type SwitchMapWOp = <C1, A, B>(
	f: (a: A) => Producer<C1, B>
) => <C2>(s: Producer<C2, A>) => Producer<C1 | C2, B>

export const switchMapW: SwitchMapWOp = f => source => (complete, next) => {
	let unsubscribe: () => void = () => {}

	unsubscribe = source(complete, a => {
		unsubscribe()
		unsubscribe = f(a)(complete, next)
	})

	return unsubscribe
}

type SwitchMapOp = <C, A, B>(
	f: (a: A) => Producer<C, B>
) => (s: Producer<C, A>) => Producer<C, B>

export const switchMap: SwitchMapOp = switchMapW
