import { type FC } from 'react';

/**
 * **DESCRIPTION:**
 * 
 * `OrSeparator` is a simple visual divider used in authentication views,
 * typically placed between two alternative actions (for example, between
 * social login buttons and the email/password form). It renders a
 * horizontal line with the word “or” centered, helping users understand
 * they can choose one option or the other.
 * 
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <OrSeparator />
 * )
 */
export const OrSeparator: FC = ({ }) => {

  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] text-gray-500">
      <span className="h-px flex-1 bg-white/10" />
      <span className="uppercase tracking-[0.2em]">or</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  )
}
