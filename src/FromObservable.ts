import * as Opt from 'fp-ts/Option'
import * as Rx from 'rxjs'

import { Producer } from './Producer'

type FromObservable = <A>(
	obs: Rx.Observable<A>
) => Producer<Opt.Option<unknown>, A>

export const fromObservable: FromObservable = source => (complete, next) => {
	const subscription = source.subscribe({
		next,
		complete: () => complete(Opt.none),
		error: err => complete(Opt.some(err))
	})

	return () => subscription.unsubscribe()
}
