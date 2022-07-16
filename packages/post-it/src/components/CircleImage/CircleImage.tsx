import styles from './CircleImage.module.scss'

export interface CircleImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

const CircleImage = ({ alt, ...args }: CircleImageProps) => {
  return <img className={styles.circleImage} alt={alt} {...args} />
}

export default CircleImage
