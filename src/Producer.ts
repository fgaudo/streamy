export interface Producer<C, A> {
	(complete: (c: C) => void, next: (a: A) => void): () => void
}
