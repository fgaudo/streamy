import { Apply2 } from 'fp-ts/lib/Apply'

import { ap } from './Ap'
import { map } from './Map'
import { Producer } from './Producer'

export const URI = 'Producer'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
	interface URItoKind2<E, A> {
		readonly [URI]: Producer<E, A>
	}
}

export const Apply: Apply2<URI> = {
	URI,
	map: (p, f) => map(f)(p),
	ap: (f, pa) => ap(pa)(f)
}
