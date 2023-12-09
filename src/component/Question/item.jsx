export default function QuestionItem({
  id,
  title,
  content
}) {
  return (
    <div>
      <div>
        {id}
      </div>  
      <div>
       <a href={'questions/'+ id}>{title}</a>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}