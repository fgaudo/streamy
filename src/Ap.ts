import { Producer } from './Producer'

type Ap = <C2, A>(
	p: Producer<C2, A>
) => <B, C1>(p: Producer<C1, (a: A) => B>) => Producer<C1 | C2, B>

export const ap: Ap = source => f => (complete, next) => {
	let subscriptions: readonly (() => void)[] = []
	let unsubscribe2: () => void = () => {}

	const unsubscribe = () => {
		subscriptions.forEach(unsub => unsub())
		subscriptions = []
	}

	const subscription = source(complete, a => {
		unsubscribe2()
		unsubscribe2 = f(complete, f => next(f(a)))

		subscriptions = [...subscriptions, unsubscribe2]
	})

	subscriptions = [subscription]

	return unsubscribe
}
