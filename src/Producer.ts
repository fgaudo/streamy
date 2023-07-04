export interface Producer<C, A> {
	(onComplete: (c: C) => void, onNext: (a: A) => void): () => void
}
