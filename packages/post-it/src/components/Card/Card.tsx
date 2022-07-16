import styles from './Card.module.scss'

export interface CardProps {
  title?: string
  description?: string
  children: React.ReactElement
}

const Card = ({ title, description, children }: CardProps) => {
  return (
    <section className={styles.card}>
      <div className={styles.messageContainer}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {description && <p className={styles.description}>{description}</p>}
      </div>

      <div className={styles.contentContainer}>{children}</div>
    </section>
  )
}

export default Card
