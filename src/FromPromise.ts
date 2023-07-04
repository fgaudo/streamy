import { Task } from 'fp-ts/lib/Task'

import { Producer } from './Producer'

type FromTask = <A>(obs: Task<A>) => Producer<A, never>

export const fromTask: FromTask = source => complete => {
	let cancelled = false

	source().then(a => {
		if (cancelled) return
		complete(a)
	})

	return () => {
		cancelled = true
	}
}
