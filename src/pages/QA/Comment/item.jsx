export default function CommentItem({
  id,
  title,
  content
}) {
  return (
    <div>
      <div>{id}</div>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  )
}