/**import { sequenceT } from 'fp-ts/lib/Apply'
import { timer } from 'rxjs'

import { Apply } from '../src/Apply'
import { fromObservable } from '../src/FromObservable'

sequenceT(Apply)(
	fromObservable(timer(5000)),
	fromObservable(timer(3000)),
	fromObservable(timer(5000)),
	fromObservable(timer(5000))
).subscribe({
	next: a => console.log(a),
	complete: c => console.log('finito', c)
})
*/

let subscriptions: number = 5

new Promise(res => {
	setTimeout(() => {
		console.log(subscriptions)
		res(undefined)
	}, 5000)
})

subscriptions = 10
