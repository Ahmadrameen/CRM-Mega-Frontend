import { FieldContextKey, useFieldError, useIsFieldDirty, useIsFieldTouched, useIsFieldValid } from 'vee-validate'
import { inject } from 'vue'

import type { InjectionKey } from 'vue'

export const FORM_ITEM_INJECTION_KEY
  // eslint-disable-next-line symbol-description
  = Symbol() as InjectionKey<string>

export function useFormField() {
  const fieldContext = inject(FieldContextKey)
  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY)

  const fieldState = {
    valid: useIsFieldValid(),
    isDirty: useIsFieldDirty(),
    isTouched: useIsFieldTouched(),
    error: useFieldError(),
  }

  if (!fieldContext)
    throw new Error('useFormField should be used within <FormField>')

  const { name } = fieldContext
  const id = fieldItemContext

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}