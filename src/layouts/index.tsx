import DefaultLayout from './DefaultLayout'
import BlankLayout from './BlankLayout'

export enum LayoutType {
  blank,
  basic,
}

const Layout = (type: LayoutType) => {
  switch (type) {
    case LayoutType.blank:
      return BlankLayout
    case LayoutType.basic:
      return DefaultLayout
    default:
      return BlankLayout
  }
}
export default Layout
