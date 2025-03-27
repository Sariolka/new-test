export const getType = (type: string) => {
  switch (type) {
    case 'text':
    case 'checkbox':
    case 'radio':
    case 'email':
    case 'tel':
    case 'password':
    case 'url':
    case 'number':
    case 'search':
      return 'input'
    case 'select':
      return 'select'
    case 'textarea':
      return 'textarea'
    default:
      return 'input'
  }
}
