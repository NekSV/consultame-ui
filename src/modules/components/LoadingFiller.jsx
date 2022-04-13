import { Spinner } from '@blueupcode/components'
import s from '@styles/custom/LoadingFiller.module.css'

const LoadingFiller = () => (
  <div className={s.container}>
    <Spinner variant="secondary"/>
  </div>
);

export default LoadingFiller;