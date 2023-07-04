import { Producer } from './Producer'

type MergeMapW = <C1, A, B>(
	f: (a: A) => Producer<C1, B>
) => <C2>(s: Producer<C2, A>) => Producer<C1 | C2, B>

export const mergeMapW: MergeMapW = f => source => (complete, next) => {
	let subscriptions: readonly (() => void)[] = []

	let unsubscribe: () => void = () => {
		subscriptions.forEach(unsubscribe => unsubscribe())
		subscriptions = []
	}

	const subscription = source(
		c => complete(c),
		a => {
			const subscription = f(a)(complete, next)

			subscriptions = [...subscriptions, subscription]
		}
	)

	subscriptions = [subscription]

	return unsubscribe
}

type MergeMapOp = <C, A, B>(
	f: (a: A) => Producer<C, B>
) => (s: Producer<C, A>) => Producer<C, B>

export const mergeMap: MergeMapOp = mergeMapW
