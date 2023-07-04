import * as Opt from 'fp-ts/Option'

import { Producer } from './Producer'

type First = <A>(p: Producer<unknown, A>) => Producer<Opt.Option<A>, never>

export const first: First = source => complete => {
	let completed = false
	let unsubscribed = false
	let unsubscribe: () => void = () => (unsubscribed = false)

	unsubscribe = source(
		() => complete(Opt.none),
		a => {
			if (unsubscribed) return
			unsubscribed = true
			unsubscribe()

			if (completed) return
			completed = true
			complete(Opt.some(a))
		}
	)

	return unsubscribe
}
