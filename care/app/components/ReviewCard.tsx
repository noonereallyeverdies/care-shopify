interface ReviewCardProps {
  quote: string;
  author: string;
  rating?: number; // Optional rating 1-5
}

export function ReviewCard({ quote, author, rating = 5 }: ReviewCardProps) {
  const renderStars = (count: number) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < count ? '★' : '☆';
    }
    return stars;
  };

  return (
    <div className="review-card" style={{ padding: 'var(--space-lg)', border: '1px solid var(--c-primary-border)', borderRadius: 'var(--border-radius-md)', textAlign: 'center', height: '100%' /* Ensure consistent height for slider */ }}>
      {rating && (
        <div className="review-stars" style={{ color: 'var(--c-accent-rlt)', marginBottom: 'var(--space-sm)', fontSize: '1.1em' }}>
          {renderStars(rating)}
        </div>
      )}
      <p className="review-text" style={{ fontStyle: 'italic', color: 'var(--c-primary-text-medium)', marginBottom: 'var(--space-md)' }}>
        "{quote}"
      </p>
      <p className="review-author" style={{ fontWeight: 'var(--font-weight-body-bold)', fontSize: 'var(--font-size-small)' }}>
        - {author}
      </p>
    </div>
  );
} 