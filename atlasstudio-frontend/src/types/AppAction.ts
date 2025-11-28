/**
 * **DESCRIPTION:**
 *
 * Global action type for the AppStore. Every reducer receives
 * this shape as `action`. You can keep it generic or create
 * more specific action creators on top of it.
 *
 * If you need strict typing per action, you can narrow `type`
 * and `payload` inside each reducer using string literals.
 */
export interface AppAction<Payload = unknown> {
  type: string;
  payload?: Payload;
}
